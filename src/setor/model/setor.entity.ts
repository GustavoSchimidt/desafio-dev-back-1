import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ISetor } from './interface/setor.interface';
import { Colaborador } from '../../colaborador/model/colaborador.entity';

@Entity('setor', { schema: 'desafio-dev-back-1' })
export class Setor implements ISetor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  nome: string;

  // @OneToMany(() => Colaborador, colaborador => colaborador.setor)
  // colaborador: Colaborador[];
}
