import { Module } from '@nestjs/common';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { SetorModule } from './setor/setor.module';

@Module({
  imports: [ColaboradorModule, SetorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
