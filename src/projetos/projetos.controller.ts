import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Delete, Param } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetoDto } from './dtos/projeto.dto';
import { Projeto } from './interfaces/projeto.interface';

@Controller('projetos')
export class ProjetosController {
    constructor(private projetosService: ProjetosService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async novoProjeto(@Body() projetoDto: ProjetoDto): Promise<Projeto> {
        return await this.projetosService.novo(projetoDto)
    }

    @Get()
    async consultarProjetos(): Promise<Projeto[]> {
        return await this.projetosService.consultarTodosProjetos();
    }

    @Delete(':_id')
    async deletarProjeto(
        @Param('_id') _id: string): Promise<void> {            
            this.projetosService.deletarProjeto(_id)
        }
}