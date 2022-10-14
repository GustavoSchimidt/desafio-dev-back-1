import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorCreateDto } from './dto/colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private readonly colaboradorService: ColaboradorService) {}

    @Post()
    @HttpCode(200)
    async create (@Body() dto: ColaboradorCreateDto): Promise<any> {
        return await this.colaboradorService.saveColaborador(dto);
    }

    // @Put()
    // @HttpCode(200)
    // async update (@Body() dto: ColaboradorCreateDto): Promise<any> {
    //     return await this.colaboradorService.updateColaborador(dto);
    // }

    // @Get()
    // @HttpCode(200)
    // async findAll (@Body() dto: ColaboradorCreateDto): Promise<any> {
    //     return await this.colaboradorService.findAll(dto);
    // }
}
