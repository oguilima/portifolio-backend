import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/helpers/auth/auth.service';

@Controller('auth') 
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: any) {
        return this.authService.gerarToken(user);
    }
}
