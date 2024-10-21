import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MedicamentoService } from '../services/medicamento.service';
import { Medicamento } from '../entities/medicamento.entity';

@ApiTags('Medicamentos')
@Controller('medicamentos')
export class MedicamentoController {
    constructor(private readonly medicamentoService: MedicamentoService) {}

    @Get()
    @ApiOperation({ summary: 'Listar todos os medicamentos' })
    @ApiResponse({ status: 200, description: 'Medicamentos encontrados com sucesso.' })
    async findAll(): Promise<Medicamento[]> {
        return await this.medicamentoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar medicamento por ID' })
    @ApiResponse({ status: 200, description: 'Medicamento encontrado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Medicamento não encontrado.' })
    async findOne(@Param('id') id: number): Promise<Medicamento> {
        return await this.medicamentoService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo medicamento' })
    @ApiResponse({ status: 201, description: 'Medicamento criado com sucesso.' })
    async create(@Body() medicamento: Medicamento): Promise<Medicamento> {
        return await this.medicamentoService.create(medicamento);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um medicamento existente' })
    @ApiResponse({ status: 200, description: 'Medicamento atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Medicamento não encontrado.' })
    async update(@Param('id') id: number, @Body() medicamento: Medicamento): Promise<Medicamento> {
        return await this.medicamentoService.update(id, medicamento);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um medicamento por ID' })
    @ApiResponse({ status: 204, description: 'Medicamento deletado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Medicamento não encontrado.' })
    async delete(@Param('id') id: number): Promise<void> {
        return await this.medicamentoService.delete(id);
    }
}
