import { DataSource } from 'typeorm';
import { Colaborador } from './colaborador.entity';

export const colaboradorProviders = [
  {
    provide: 'COLABORADOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Colaborador),
    inject: ['DATABASE_CONNECTION'],
  },
];