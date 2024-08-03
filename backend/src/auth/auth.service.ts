import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,) { }


    refreshTokens(userId: any, refreshToken: any) {
        throw new Error('Method not implemented.');
    }
    logout(arg0: any) {
        throw new Error('Method not implemented.');
    }
    signUp(createUserDto: Object) {
        throw new Error('Method not implemented.');
    }


    async signIn(data: Object) {

    }

}
