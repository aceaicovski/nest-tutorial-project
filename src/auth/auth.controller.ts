/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthCotroller {
    constructor (private authService: AuthService) {}

    @Post('signup')
    signup (@Body() dto: AuthDto) {
        console.log({
            dto,
        });
        return this.authService.signup();
    }

    @Post('signin')
    signin () {
        return this.authService.signin();
    }
}