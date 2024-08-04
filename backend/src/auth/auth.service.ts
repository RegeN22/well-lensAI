import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from 'src/user/types/createUserDTO.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) { }


    async register(user: CreateUserDto) {
        return this.userService.create(user);
    }

    async login(username: string, password: string) {
        if (!username || !password) {
            throw new UnauthorizedException("Missing username or password");
        }

        const user = await this.userService.findByUsernameOrEmail(username);
        if (user == null) {
            throw new UnauthorizedException("Username or password incorrect");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new UnauthorizedException("Username or password incorrect");
        }
        return await this.userService.generateTokens(user);

    }


    async logout(userId: string, refreshToken: string) {

        if (userId == null) throw new UnauthorizedException();
        try {
            const userDb = await this.userService.findById(userId);
            userDb.refreshTokens = userDb.refreshTokens.filter((t) => t !== refreshToken);
            await userDb.save();
            return "Logout succeeded";

        } catch (error) {
            throw new UnauthorizedException();
        }

    }

    async refresh(authHeader: string) {
        const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
        if (refreshToken == null) throw new UnauthorizedException(401);

        try {
            const secret = this.configService.get("JWT_SECRET");
            const refreshSecret = this.configService.get("JWT_REFRESH_SECRET");
            const expiresIn = this.configService.get("JWT_EXPIRATION");
            const user = this.jwtService.verify(refreshToken, { secret: refreshSecret });

            const userDb = await this.userService.findById(user._id);

            if (
                !userDb.refreshTokens ||
                !userDb.refreshTokens.includes(refreshToken)
            ) {
                userDb.refreshTokens = [];
                await userDb.save();
                throw new UnauthorizedException("Refresh token invalid");
            }
            const accessToken = this.jwtService.sign(
                { _id: user._id },
                {
                    secret,
                    expiresIn
                }
            );
            const newRefreshToken = this.jwtService.sign(
                { _id: user._id },
                { secret: refreshSecret }
            );
            userDb.refreshTokens = userDb.refreshTokens.filter(
                (t) => t !== refreshToken
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
