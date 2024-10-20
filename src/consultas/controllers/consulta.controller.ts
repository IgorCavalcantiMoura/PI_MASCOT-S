
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Consulta } from '../entities/consulta.entity';
import { ConsultaService } from '../services/consulta.service';

@ApiTags('Consultas')
@Controller('consultas')
export class ConsultasController {
    constructor(private readonly consultasService: ConsultaService) {}

    @Get()
    @ApiOperation({ summary: 'Buscar todas as consultas' })
    @ApiResponse({ status: 200, description: 'Lista de consultas retornada com sucesso.' })
    async findAll(): Promise<Consulta[]> {
        return await this.consultasService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar consulta por ID' })
    @ApiResponse({ status: 200, description: 'Consulta encontrada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da consulta', example: 1 })
    async findById(@Param('id') id: number): Promise<Consulta> {
        return await this.consultasService.findById(id);
    }

    @Get('veterinario/:veterinarioId')
    @ApiOperation({ summary: 'Buscar consultas por veterinário' })
    @ApiResponse({ status: 200, description: 'Consultas encontradas com sucesso.' })
    @ApiResponse({ status: 404, description: 'Veterinário não encontrado ou sem consultas.' })
    @ApiParam({ name: 'veterinarioId', description: 'ID do veterinário', example: 1 })
    async findByVeterinario(@Param('veterinarioId') veterinarioId: number): Promise<Consulta[]> {
        return await this.consultasService.findByVeterinario(veterinarioId);
    }

    @Get('data-hora/:dataHora')
    @ApiOperation({ summary: 'Buscar consultas por data' })
    @ApiResponse({ status: 200, description: 'Consultas encontradas com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    @ApiParam({ name: 'dataHora', description: 'data da consulta', example: '2024-10-20' })
    async findByData(@Param('dataHora') dataHora: string): Promise<Consulta[]> {
        return await this.consultasService.findByData(dataHora);
    }

    @Get('estado-animal/:estado_animal')
    @ApiOperation({ summary: 'Buscar consultas por estado de saúde do Animal' })
    @ApiResponse({ status: 200, description: 'Consultas encontradas com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consultas não encontradas ou sem consultas.' })
    @ApiParam({ name: 'estado_animal', description: 'Estado de Saúde do Animal', example: 'Estável' })
    async findByEstadoAnimal(@Param('estado_animal') estado_animal: string): Promise<Consulta[]> {
        return await this.consultasService.findByEstadoAnimal(estado_animal);
    }

    @Get('diagnostico/:diagnostico')
    @ApiOperation({ summary: 'Buscar consultas por diagnostico' })
    @ApiResponse({ status: 200, description: 'Consultas encontradas com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consultas não encontradas ou sem consultas.' })
    @ApiParam({ name: 'diagnostico', description: 'Diagnóstico do Animal', example: 'Alergia' })
    async findByDiagnostico(@Param('diagnostico') diagnostico: string): Promise<Consulta[]> {
        return await this.consultasService.findByDiagnostico(diagnostico);
    }


    @Get('dono-pet/:donoPetId')
    @ApiOperation({ summary: 'Buscar consultas por dono do pet' })
    @ApiResponse({ status: 200, description: 'Consultas encontradas com sucesso.' })
    @ApiResponse({ status: 404, description: 'Dono do pet não encontrado ou sem consultas.' })
    @ApiParam({ name: 'donoPetId', description: 'ID do dono do pet', example: 1 })
    async findByDonoPet(@Param('donoPetId') donoPetId: number): Promise<Consulta[]> {
        return await this.consultasService.findByDonoPet(donoPetId);
    }

    @Post()
    @ApiOperation({ summary: 'Criar uma nova consulta' })
    @ApiResponse({ status: 201, description: 'Consulta criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos para criar a consulta.' })
    async create(@Body() consulta: Consulta): Promise<Consulta> {
        try {
            return await this.consultasService.create(consulta);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put()
    @ApiOperation({ summary: 'Atualizar uma consulta existente' })
    @ApiResponse({ status: 200, description: 'Consulta atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos para atualizar a consulta.' })
    async update(@Body() consulta: Consulta): Promise<Consulta> {
        try {
            return await this.consultasService.update(consulta);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Excluir uma consulta por ID' })
    @ApiResponse({ status: 204, description: 'Consulta excluída com sucesso.' })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da consulta', example: 1 })
    async delete(@Param('id') id: number): Promise<void> {
        return await this.consultasService.delete(id);
    }
}
