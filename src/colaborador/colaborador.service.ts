import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColaboradorCreateDto } from './dto/colaborador.dto';
import { Colaborador } from './model/colaborador.entity';

@Injectable()
export class ColaboradorService {
    constructor(
        @Inject('COLABORADOR_REPOSITORY')
        private colaboradorRepository: Repository<Colaborador>,
    ) {}

    async saveColaborador (dto: ColaboradorCreateDto): Promise<any> {
        return await this.colaboradorRepository.save({
            cpf: dto.cpf,
            nome: dto.nome,
            telefone: dto.telefone,
            data_nascimento: dto.dataNascimento,
            email: dto.email,
            setor: { id: dto.setorId },
        });
    }
}
