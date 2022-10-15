import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IColaborador } from './interface/colaborador.interface';
import { Setor } from '../../setor/model/setor.entity';

@Entity('colaborador', { schema: 'desafio-dev-back-1' })
export class Colaborador implements IColaborador {
  @PrimaryColumn('char', { length: 11 })
  cpf: string;

  @Column('varchar', { length: 255 })
  nome: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 11,  nullable: true })
  telefone: string;

  @Column('datetime', { nullable: true })
  data_nascimento: Date;

  @ManyToOne(() => Setor, {cascade: true})
  @JoinColumn({ name: 'setor_id', referencedColumnName: 'id' })
  setor: Setor;

}
