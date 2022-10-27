/* eslint-disable prettier/prettier */
import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthCotroller {
    constructor (private authService: AuthService) {}

    @Post('signup')
    signup () {
        return 'I am signed up!'
    }

    @Post('signin')
    signin () {
        return 'I am signed in!'
    }
}