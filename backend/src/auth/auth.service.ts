import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from 'src/user/types/createUserDTO.type';
import { UserService } from 'src/user/user.service';
const client = new OAuth2Client();
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signInWithGoogle(credential: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      const email = payload?.email;
      let user;
      if (email != null) {
        user = await this.userService.findByUsernameOrEmail(email);
        if (user == null) {
          user = await this.userService.create({
            username: email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: email,
            password: '0',
            imgUrl: payload?.picture,
          });
        }
        const tokens = await this.userService.generateTokens(user);
        return {
          email: user.email,
          _id: user._id,
          imgUrl: user.imgUrl,
          username: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          allergies: user.allergies,
          diseases: user.diseases,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          ...tokens,
        };
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async register(user: CreateUserDto) {
    return this.userService.create(user);
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Missing email or password');
    }

    const user = await this.userService.findByUsernameOrEmail(email);
    if (user == null) {
      throw new BadRequestException('Email or password incorrect');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('Username or password incorrect');
    }

    const tokens = await this.userService.generateTokens(user);
    return { ...user, ...tokens };
  }

  async logout(userId: string, refreshToken: string) {
    if (userId == null) throw new UnauthorizedException();
    try {
      const userDb = await this.userService.findById(userId);
      if (
        !userDb.refreshTokens ||
        !userDb.refreshTokens.includes(refreshToken)
      ) {
        userDb.refreshTokens = [];
        await userDb.save();
        throw new UnauthorizedException();
      } else {
        userDb.refreshTokens = userDb.refreshTokens.filter(
          (t) => t !== refreshToken,
        );
        await userDb.save();
        return 'Logout succeeded';
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async refresh(userId: string, refreshToken: string) {
    if (refreshToken == null) throw new UnauthorizedException(401);

    try {
      const secret = this.configService.get('JWT_SECRET');
      const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
      const expiresIn = this.configService.get('JWT_EXPIRATION');

      const userDb = await this.userService.findById(userId);

      if (
        !userDb.refreshTokens ||
        !userDb.refreshTokens.includes(refreshToken)
      ) {
        userDb.refreshTokens = [];
        await userDb.save();
        throw new UnauthorizedException('Refresh token invalid');
      }
      const accessToken = this.jwtService.sign(
        { _id: userId },
        {
          secret,
          expiresIn,
        },
      );
      const newRefreshToken = this.jwtService.sign(
        { _id: userId },
        { secret: refreshSecret },
      );
      userDb.refreshTokens = userDb.refreshTokens.filter(
        (t) => t !== refreshToken,
      );
      userDb.refreshTokens.push(newRefreshToken);
      await userDb.save();
      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
