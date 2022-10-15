import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorCreateDto } from './dto/colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private readonly colaboradorService: ColaboradorService) {}

    @Post()
    @HttpCode(200)
    async create (@Body() dto: ColaboradorCreateDto): Promise<ColaboradorCreateDto> {
        return await this.colaboradorService.saveColaborador(dto);
    }

    @Get()
    @HttpCode(200)
    async findAll (
        @Query('nome') nome?: string,
        @Query('setorId') setorId?: number,
    ) {
        return await this.colaboradorService.findAll(nome, setorId);
    }

    @Get('/:cpf')
    @HttpCode(200)
    async findByCpf (
        @Param('cpf') cpf: string,
    ) {
        return await this.colaboradorService.findByCpf(cpf);
    }


    @Delete('/:cpf')
    @HttpCode(200)
    async delete (
        @Param('cpf') cpf: string,
    ) {
        return await this.colaboradorService.delete(cpf);
    }
}
