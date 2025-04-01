import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async gerarToken(user: any) {

        const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

        if (user.username !== adminUsername || user.password !== adminPassword) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { username: user.username, sub: 'admin' };
        return { access_token: this.jwtService.sign(payload) };
    }
}
