import { IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator'
import { Tecnologia } from '../interfaces/tecnologia.interface';

export class ProjetoDto {

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly cliente: string;

    @IsNotEmpty()
    readonly description: string;  

    @IsOptional()
    @IsString()
    imagemUrl?: string;

    @IsArray()
    techs: Array<Tecnologia>;  

    @IsOptional()
    @IsString()
    github?: string;
}