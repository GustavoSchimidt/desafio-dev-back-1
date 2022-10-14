import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { DatabaseModule } from '../database/database.module';
import { colaboradorProviders } from './model/colaborador.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...colaboradorProviders, ColaboradorService],
  controllers: [ColaboradorController],
})
export class ColaboradorModule {}
