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
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Exame } from '../entities/exame.entity';
import { ExameService } from '../services/exame.service';

@ApiTags('Exames')
@Controller('exames')
export class ExamesController {
  constructor(private readonly exameService: ExameService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os exames' })
  @ApiResponse({
    status: 200,
    description: 'Lista de exames retornada com sucesso.',
  })
  async findAll(): Promise<Exame[]> {
    return await this.exameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar exame por ID' })
  @ApiResponse({ status: 200, description: 'Exame encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do exame', example: 1 })
  async findById(@Param('id') id: number): Promise<Exame> {
    return await this.exameService.findById(id);
  }

  @Get('pet/:petId')
  @ApiOperation({ summary: 'Buscar exames por ID do pet' })
  @ApiResponse({ status: 200, description: 'Exames encontrados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum exame encontrado para este pet.',
  })
  @ApiParam({ name: 'petId', description: 'ID do pet', example: 1 })
  async findByPetId(@Param('petId') petId: number): Promise<Exame[]> {
    return await this.exameService.findByPetId(petId);
  }

  @Get('data/:dataHora')
  @ApiOperation({ summary: 'Buscar exames por data' })
  @ApiResponse({ status: 200, description: 'Exames encontrados com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum exame encontrado para esta data.',
  })
  @ApiParam({
    name: 'dataHora',
    description: 'Data do exame',
    example: '2024-10-20',
  })
  async findByData(@Param('dataHora') dataHora: string): Promise<Exame[]> {
    return await this.exameService.findByData(dataHora);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo exame' })
  @ApiResponse({ status: 201, description: 'Exame criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criar o exame.',
  })
  async create(@Body() exame: Exame): Promise<Exame> {
    try {
      return await this.exameService.create(exame);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar um exame existente' })
  @ApiResponse({ status: 200, description: 'Exame atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Exame não encontrada.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualizar a Exame.',
  })
  async update(@Body() exame: Exame): Promise<Exame> {
    try {
      return await this.exameService.update(exame);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Atualizar o status de um exame' })
  @ApiResponse({
    status: 200,
    description: 'Status do exame atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Exame não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do exame', example: 1 })
  @ApiBody({
    description: 'Novo status do exame',
    schema: { type: 'string', example: 'finalizado' },
  })
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Exame> {
    return await this.exameService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um exame por ID' })
  @ApiResponse({ status: 204, description: 'Exame excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Exame não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do exame', example: 1 })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.exameService.delete(id);
  }
}
