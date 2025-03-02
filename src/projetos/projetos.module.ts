import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { ProjetoSchema } from './interfaces/projeto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Projeto', schema: ProjetoSchema}])],
  controllers: [ProjetosController],
  providers: [ProjetosService],
  exports: [ProjetosService]
})
export class ProjetosModule {}
