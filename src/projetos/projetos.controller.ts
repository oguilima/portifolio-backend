import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Get,
    Delete,
    Param,
    UseGuards
} from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetoDto } from './dtos/projeto.dto';
import { Projeto } from './interfaces/projeto.interface';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/helpers/auth/auth.service';

@Controller('projetos')
export class ProjetosController {
    constructor(private readonly projetosService: ProjetosService, private authService: AuthService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })
    )
    async novoProjeto(@Body() projetoDto: ProjetoDto): Promise<Projeto> {
        return await this.projetosService.novo(projetoDto);
    }

    @Get()
    async consultarProjetos(): Promise<Projeto[]> {
        return await this.projetosService.consultarTodosProjetos();
    }

    @Delete(':_id')
    @UseGuards(AuthGuard('jwt'))
    async deletarProjeto(@Param('_id') _id: string): Promise<void> {
        await this.projetosService.deletarProjeto(_id);
    }

   
}
