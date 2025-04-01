import { Module } from '@nestjs/common';
import { ProjetosController } from './projetos/projetos.controller';
import { ProjetosModule } from './projetos/projetos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './helpers/auth/auth.module';
import { AuthController } from './helpers/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_LINK'),
      }),
    }),
    AuthModule,
    ProjetosModule,
  ],
  controllers: [ProjetosController, AuthController],
  providers: [],
})
export class AppModule {}
