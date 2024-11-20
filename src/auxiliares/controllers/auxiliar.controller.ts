import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuxiliarService } from "../services/auxiliar.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Auxiliar } from "../entities/auxiliar.entity";

@ApiTags('Auxiliar')
@Controller("/auxiliar")

export class AuxiliarController {
    constructor(private readonly auxiliarService: AuxiliarService) { }

    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter todos os auxiliares' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de auxiliares obtida com sucesso.' })
    findAll(): Promise<Auxiliar[]> {
        return this.auxiliarService.findAll();
    }

    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter auxiliar pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do auxiliar a ser obtido' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Auxiliar obtido com sucesso.' })
    findById(@Param('id', ParseIntPipe) id: number): Promise<Auxiliar> {
        return this.auxiliarService.findById(id);
    }

    
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter auxiliares pelo nome' })
    @ApiParam({ name: 'nome', description: 'Nome dos auxiliares a serem obtidos' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de auxiliares com o nome fornecido obtida com sucesso.' })
    findByName(@Param('nome') nome: string): Promise<Auxiliar[]> { 
        return this.auxiliarService.findByName(nome)
    }

    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar um novo auxiliar' })
    @ApiBody({ description: 'Dados do novo auxiliar', type: Auxiliar })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Auxiliar criado com sucesso.' })
    create(@Body() auxiliar: Auxiliar): Promise<Auxiliar>{
        return this.auxiliarService.create(auxiliar)
    }

    
    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar um auxiliar' })
    @ApiBody({ description: 'Dados atualizados do auxiliar', type: Auxiliar })
    @ApiResponse({ status: HttpStatus.OK, description: 'Auxiliar atualizado com sucesso.' })
    update(@Body() auxiliar: Auxiliar): Promise<Auxiliar> { 
        return this.auxiliarService.update(auxiliar)
    }

    
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Excluir um auxiliar pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do auxiliar a ser excluído' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Auxiliar excluído com sucesso.' })
    delete(@Param('id', ParseIntPipe) id: number){
        return this.auxiliarService.delete(id)
    }

}