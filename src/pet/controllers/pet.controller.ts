import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Pet } from "../entities/pet.entity";
import { PetService } from "../services/pet.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Pet')
@ApiBearerAuth()
@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Obter todos os pets' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de pets obtida com sucesso.' })
    async findAll(): Promise<Pet[]> {
        return await this.petService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Obter pet pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do pet' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet obtido com sucesso.' })
    async findById(@Param('id') id: number): Promise<Pet> {
        return await this.petService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    @ApiOperation({ summary: 'Obter pets pelo nome' })
    @ApiParam({ name: 'nome', description: 'Nome do pet' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de pets com o nome fornecido obtida com sucesso.' })
    async findByName(@Param('nome') nome: string): Promise<Pet[]> {
        return await this.petService.findByName(nome);
    }

    @UseGuards(JwtAuthGuard)
    @Get('genero/:genero')
    @ApiOperation({ summary: 'Obter pets pelo gênero' })
    @ApiParam({ name: 'genero', description: 'Gênero dos pets' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de pets com o gênero fornecido obtida com sucesso.' })
    async findByGenero(@Param('genero') genero: string): Promise<Pet[]> {
        return await this.petService.findByGenero(genero);
    }

    @UseGuards(JwtAuthGuard)
    @Get('especie/:especie')
    @ApiOperation({ summary: 'Obter pets pela espécie' })
    @ApiParam({ name: 'especie', description: 'Espécie dos pets' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de pets com a espécie fornecida obtida com sucesso.' })
    async findByEspecie(@Param('especie') especie: string): Promise<Pet[]> {
        return await this.petService.findByEspecie(especie);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo pet' })
    @ApiBody({ description: 'Dados do novo pet', type: Pet })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Pet criado com sucesso.' })
    async create(@Body() pet: Pet): Promise<Pet> {
        return await this.petService.create(pet);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiOperation({ summary: 'Atualizar um pet existente' })
    @ApiBody({ description: 'Dados do pet a ser atualizado', type: Pet })
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet atualizado com sucesso.' })
    @HttpCode(HttpStatus.OK)
    update(@Body() pet: Pet): Promise<Pet> { 
        return this.petService.update(pet)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Excluir um pet pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do pet a ser excluído' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Pet excluído com sucesso.' })
    async delete(@Param('id') id: number): Promise<void> {
        await this.petService.delete(id);
    }
}
