import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/types/createUserDTO.type';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }


    refreshTokens(userId: any, refreshToken: any) {
        throw new Error('Method not implemented.');
    }
    logout(arg0: any) {
        throw new Error('Method not implemented.');
    }
    async signUp(createUserDto: CreateUserDto): Promise<{}> {
        return this.userService.create(createUserDto)
    }

    async signIn(data: Object) {

    }

}
