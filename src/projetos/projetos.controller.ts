import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Get,
    Delete,
    Param,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjetosService } from './projetos.service';
import { ProjetoDto } from './dtos/projeto.dto';
import { Projeto } from './interfaces/projeto.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/helpers/auth/auth.service';

@Controller('projetos')
export class ProjetosController {
    constructor(private readonly projetosService: ProjetosService, private authService: AuthService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @UseInterceptors(
        FileInterceptor('imagem', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
                    return cb(null, false);
                }
                cb(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    )
    async novoProjeto(@Body() projetoDto: ProjetoDto, @UploadedFile() imagem?: Express.Multer.File): Promise<Projeto> {
        if (!imagem) {
            throw new BadRequestException('Imagem é obrigatória e deve estar em formato válido (jpg, jpeg, png, gif).');
        }
        projetoDto.imagemUrl = `/uploads/${imagem.filename}`;
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
