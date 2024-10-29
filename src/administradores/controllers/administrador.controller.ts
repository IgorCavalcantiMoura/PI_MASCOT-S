import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdministradorService } from "../services/administrador.service";
import { Administrador } from "../entities/administrador.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Administrador')
@Controller("/administrador")
@ApiBearerAuth()
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter todos os administradores' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de administradores obtida com sucesso.' })
    findAll(): Promise<Administrador[]> {
        return this.administradorService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter administrador pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do administrador a ser obtido' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Administrador obtido com sucesso.' })
    findById(@Param('id', ParseIntPipe) id: number): Promise<Administrador> {
        return this.administradorService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter administradores pelo nome' })
    @ApiParam({ name: 'nome', description: 'Nome dos administradores a serem obtidos' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de administradores com o nome fornecido obtida com sucesso.' })
    findByName(@Param('nome') nome: string): Promise<Administrador[]> { 
        return this.administradorService.findByName(nome)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar um novo administrador' })
    @ApiBody({ description: 'Dados do novo administrador', type: Administrador })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Administrador criado com sucesso.' })
    create(@Body() administrador: Administrador): Promise<Administrador>{
        return this.administradorService.create(administrador)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar um administrador' })
    @ApiBody({ description: 'Dados atualizados do administrador', type: Administrador })
    @ApiResponse({ status: HttpStatus.OK, description: 'Administrador atualizado com sucesso.' })
    update(@Body() administrador: Administrador): Promise<Administrador> { 
        return this.administradorService.update(administrador)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Excluir um administrador pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do administrador a ser excluído' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Administrador excluído com sucesso.' })
    delete(@Param('id', ParseIntPipe) id: number){
        return this.administradorService.delete(id)
    }

}

