import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';
import { InternacaoService } from '../services/internacao.service';
import { Internacao } from '../entities/internacao.entity';

@ApiTags('Internações')
@Controller('internacoes')
export class InternacaoController {
    constructor(private readonly internacaoService: InternacaoService) {}

    @Get()
    @ApiOperation({ summary: 'Listar todas as internações' })
    @ApiResponse({ status: 200, description: 'Internações encontradas com sucesso.' })
    async findAll(): Promise<Internacao[]> {
        return await this.internacaoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar internação por ID' })
    @ApiResponse({ status: 200, description: 'Internação encontrada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Internação não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da internação', example: 1 })
    async findById(@Param('id') id: number): Promise<Internacao> {
        return await this.internacaoService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar nova internação' })
    @ApiResponse({ status: 201, description: 'Internação criada com sucesso.' })
    @ApiBody({ type: Internacao })
    async create(@Body() internacao: Internacao): Promise<Internacao> {
        return await this.internacaoService.create(internacao);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar internação' })
    @ApiResponse({ status: 200, description: 'Internação atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Internação não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da internação', example: 1 })
    async update(@Param('id') id: number, @Body() updateData: Partial<Internacao>): Promise<Internacao> {
        return await this.internacaoService.update(id, updateData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar internação' })
    @ApiResponse({ status: 204, description: 'Internação deletada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Internação não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da internação', example: 1 })
    async delete(@Param('id') id: number): Promise<void> {
        await this.internacaoService.delete(id);
    }
}
