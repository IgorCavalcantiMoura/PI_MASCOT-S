import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdminMedicamentosService } from '../services/adminMedicamentos.service';
import { AdminMedicamentos } from '../entities/adminMedicamentos.entity';

@ApiTags('Administração de Medicamentos')
@Controller('admin-medicamentos')
export class AdminMedicamentosController {
    constructor(private readonly adminMedicamentosService: AdminMedicamentosService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova administração de medicamento' })
    @ApiResponse({ status: 201, description: 'Administração de medicamento criada com sucesso.', type: AdminMedicamentos })
    @ApiResponse({ status: 400, description: 'Erro ao criar administração de medicamento.' })
    @ApiBody({ type: AdminMedicamentos })
    async create(@Body() adminMedicamento: AdminMedicamentos): Promise<AdminMedicamentos> {
        try {
            return await this.adminMedicamentosService.create(adminMedicamento);
        } catch (error) {
            throw new HttpException('Erro ao criar administração de medicamento', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Busca todas as administrações de medicamentos' })
    @ApiResponse({ status: 200, description: 'Lista de administrações de medicamentos', type: [AdminMedicamentos] })
    async findAll(): Promise<AdminMedicamentos[]> {
        return await this.adminMedicamentosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma administração de medicamento por ID' })
    @ApiParam({ name: 'id', description: 'ID da administração de medicamento', type: Number })
    @ApiResponse({ status: 200, description: 'Administração de medicamento encontrada', type: AdminMedicamentos })
    @ApiResponse({ status: 404, description: 'Administração de medicamento não encontrada' })
    async findOne(@Param('id') id: number): Promise<AdminMedicamentos> {
        try {
            return await this.adminMedicamentosService.findOne(id);
        } catch (error) {
            throw new HttpException('Administração de medicamento não encontrada', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza uma administração de medicamento por ID' })
    @ApiParam({ name: 'id', description: 'ID da administração de medicamento', type: Number })
    @ApiResponse({ status: 200, description: 'Administração de medicamento atualizada com sucesso', type: AdminMedicamentos })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar administração de medicamento' })
    @ApiBody({ type: AdminMedicamentos })
    async update(
        @Param('id') id: number,
        @Body() updatedAdminMedicamento: AdminMedicamentos,
    ): Promise<AdminMedicamentos> {
        try {
            return await this.adminMedicamentosService.update(id, updatedAdminMedicamento);
        } catch (error) {
            throw new HttpException('Erro ao atualizar administração de medicamento', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma administração de medicamento por ID' })
    @ApiParam({ name: 'id', description: 'ID da administração de medicamento', type: Number })
    @ApiResponse({ status: 204, description: 'Administração de medicamento removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Erro ao remover administração de medicamento' })
    async remove(@Param('id') id: number): Promise<void> {
        try {
            await this.adminMedicamentosService.remove(id);
        } catch (error) {
            throw new HttpException('Erro ao remover administração de medicamento', HttpStatus.NOT_FOUND);
        }
    }
}
