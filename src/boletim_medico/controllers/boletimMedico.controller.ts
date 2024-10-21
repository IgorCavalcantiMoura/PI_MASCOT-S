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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BoletimMedicoService } from '../services/boletimMedico.service';
import { BoletimMedico } from '../entities/boletimMedico.entity';


@ApiTags('Boletins Médicos')
@Controller('boletins-medicos')
export class BoletimMedicoController {
    constructor(private readonly boletimMedicoService: BoletimMedicoService) {}

    @Get()
    @ApiOperation({ summary: 'Buscar todos os boletins médicos' })
    @ApiResponse({ status: 200, description: 'Lista de boletins médicos retornada com sucesso.' })
    async findAll(): Promise<BoletimMedico[]> {
        return await this.boletimMedicoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar boletim médico por ID' })
    @ApiResponse({ status: 200, description: 'Boletim médico encontrado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Boletim médico não encontrado.' })
    @ApiParam({ name: 'id', description: 'ID do boletim médico', example: 1 })
    async findById(@Param('id') id: number): Promise<BoletimMedico> {
        return await this.boletimMedicoService.findById(id);
    }

    @Get('internacao/:internacaoId')
    @ApiOperation({ summary: 'Buscar boletins médicos por ID da internação' })
    @ApiResponse({ status: 200, description: 'Boletins médicos encontrados com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhum boletim médico encontrado para a internação.' })
    @ApiParam({ name: 'internacaoId', description: 'ID da internação', example: 1 })
    async findByInternacaoId(@Param('internacaoId') internacaoId: number): Promise<BoletimMedico[]> {
        return await this.boletimMedicoService.findByInternacaoId(internacaoId);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo boletim médico' })
    @ApiResponse({ status: 201, description: 'Boletim médico criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos para criar o boletim médico.' })
    async create(@Body() boletimMedico: BoletimMedico): Promise<BoletimMedico> {
        try {
            return await this.boletimMedicoService.create(boletimMedico);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar boletim médico existente' })
    @ApiResponse({ status: 200, description: 'Boletim médico atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Boletim médico não encontrado.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos para atualizar o boletim médico.' })
    @ApiParam({ name: 'id', description: 'ID do boletim médico', example: 1 })
    async update(@Param('id') id: number, @Body() boletimMedico: BoletimMedico): Promise<BoletimMedico> {
        try {
            return await this.boletimMedicoService.update(id, boletimMedico);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Excluir boletim médico por ID' })
    @ApiResponse({ status: 204, description: 'Boletim médico excluído com sucesso.' })
    @ApiResponse({ status: 404, description: 'Boletim médico não encontrado.' })
    @ApiParam({ name: 'id', description: 'ID do boletim médico', example: 1 })
    async delete(@Param('id') id: number): Promise<void> {
        return await this.boletimMedicoService.delete(id);
    }
}
