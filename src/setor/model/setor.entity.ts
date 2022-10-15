import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ISetor } from './interface/setor.interface';

@Entity('setor', { schema: 'desafio-dev-back-1' })
export class Setor implements ISetor {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column('varchar', { length: 255 })
  nome: string;
}
