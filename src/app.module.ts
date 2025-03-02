import { Module } from '@nestjs/common';
import { ProjetosController } from './projetos/projetos.controller';
import { ProjetosModule } from './projetos/projetos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('DB_LINK'),
    }),
  }), ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), ProjetosModule],
  controllers: [ProjetosController],
  providers: [],
})
export class AppModule {

}
