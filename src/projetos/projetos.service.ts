import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjetoDto } from './dtos/projeto.dto';
import { Projeto } from './interfaces/projeto.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjetosService {
    constructor(@InjectModel('Projeto') private readonly projetoModel: Model<Projeto>) {}

    async novo(projeto: ProjetoDto): Promise<Projeto> {
        const projetoCriado = new this.projetoModel(projeto);
        return await projetoCriado.save();
    }

    async consultarTodosProjetos(): Promise<Projeto[]> {
        return await this.projetoModel.find().exec();
    }

    async deletarProjeto(_id: string): Promise<void> {
        const projetoEncontrado = await this.projetoModel.findById(_id).exec();

        if (!projetoEncontrado) {
            throw new NotFoundException(`Projeto com id ${_id} não encontrado`);
        }

        await this.projetoModel.deleteOne({ _id }).exec();
    }
}
