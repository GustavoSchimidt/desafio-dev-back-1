import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { dateIsValid } from 'src/utils/dateIsValid';
import { Repository } from 'typeorm';
import { ColaboradorCreateDto } from './dto/colaborador.dto';
import { Colaborador } from './model/colaborador.entity';

@Injectable()
export class ColaboradorService {
    constructor(
        @Inject('COLABORADOR_REPOSITORY')
        private colaboradorRepository: Repository<Colaborador>,
    ) {}

    async saveColaborador (dto: ColaboradorCreateDto): Promise<ColaboradorCreateDto> {
        this.validateFilds(dto);

        await this.colaboradorRepository.save({
            cpf: dto.cpf,
            nome: dto.nome,
            telefone: dto.telefone,
            data_nascimento: dto.dataNascimento,
            email: dto.email,
            setor: { id: dto.setorId },
        });

        return dto;
    }

    async findAll(nome?: string, setorId?: number) {
        const qb = this.colaboradorRepository.createQueryBuilder('colaborador')
        .leftJoinAndSelect('colaborador.setor', 'setor');
  
        if (nome) {
            qb.andWhere('colaborador.nome like :nome', {
                nome,
            });
        }

        if (setorId) {
            qb.andWhere('setor.id = :setorId', {
                setorId,
            });
        }
  
        const queryResult = await qb
        .orderBy({ "colaborador.nome": 'ASC' })
        .limit(10)
        .offset(0)
        .getMany();

        return queryResult.map((colaborador) => {
            return {
                cpf: colaborador.cpf,
                nome: colaborador.nome,
                email: colaborador.email,
                setor: {
                    id: colaborador.setor.id,
                    nome: colaborador.setor.nome,
                }
            }  
        });
    }

    async findByCpf(cpf: string) {
        const colaborador = await this.colaboradorExists(cpf);

        return {
            cpf: colaborador.cpf,
            nome: colaborador.nome,
            email: colaborador.email,
            setor: {
                id: colaborador.setor.id,
                nome: colaborador.setor.nome,
            }
        };  
    }

    async delete(cpf: string) {
        const colaborador = await this.colaboradorExists(cpf);

        await this.colaboradorRepository.delete(colaborador);
    }

    private async colaboradorExists (cpf: string): Promise<Colaborador> {
        const colaborador = await this.colaboradorRepository.findOne({ where: { cpf }, relations: ['setor'] });
        if (!colaborador) throw new NotFoundException('Colaborador nao encontrado.');
        return colaborador;
    }

    private validateFilds(dto: ColaboradorCreateDto) {
        if(!dto.cpf) throw new BadRequestException('O campo CPF e obrigatorio.');
        if(!dto.nome) throw new BadRequestException('O campo NOME e obrigatorio.');
        if(!dto.email) throw new BadRequestException('O campo EMAIL e obrigatorio.');

        const containsWords = dto.nome.replace(/ /g, "").length > 2 && dto.nome.match(/\s/g)?.length > 0;
        if (!containsWords) throw new BadRequestException('Nome invalido.');
        const dateIsvalid = dateIsValid(dto.dataNascimento);
        if(!dateIsvalid) throw new BadRequestException('Data de nascimento invalida.');
    }
}
