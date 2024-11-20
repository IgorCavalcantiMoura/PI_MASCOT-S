import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Procedimento } from '../entities/procedimento.entity';
import { ProcedimentoService } from '../services/procedimentos.service';


@ApiTags('Procedimentos')
@ApiBearerAuth()
@Controller('procedimentos')
export class ProcedimentoController {
    constructor(private readonly procedimentoService: ProcedimentoService) {}

    
    @Get()
    @ApiResponse({ status: 200, description: 'Retorna todos os procedimentos.' })
    async findAll(): Promise<Procedimento[]> {
        return this.procedimentoService.findAll();
    }

    
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID do procedimento' })
    @ApiResponse({ status: 200, description: 'Retorna o procedimento com o ID fornecido.', type: Procedimento })
    @ApiResponse({ status: 404, description: 'Procedimento não encontrado.' })
    async findById(@Param('id') id: number): Promise<Procedimento> {
        return this.procedimentoService.findById(id);
    }

    
    @Post()
    @ApiResponse({ status: 201, description: 'Cria um novo procedimento.', type: Procedimento })
    async create(@Body() procedimento: Procedimento): Promise<Procedimento> {
        return this.procedimentoService.create(procedimento);
    }

    
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id', type: Number, description: 'ID do procedimento' })
    @ApiResponse({ status: 200, description: 'Atualiza o procedimento com o ID fornecido.', type: Procedimento })
    @ApiResponse({ status: 404, description: 'Procedimento não encontrado.' })
    async update(@Param('id') id: number, @Body() procedimento: Procedimento): Promise<Procedimento> {
        return this.procedimentoService.update(id, procedimento);
    }

    
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID do procedimento' })
    @ApiResponse({ status: 204, description: 'Remove o procedimento com o ID fornecido.' })
    @ApiResponse({ status: 404, description: 'Procedimento não encontrado.' })
    async delete(@Param('id') id: number): Promise<void> {
        return this.procedimentoService.delete(id);
    }
}
