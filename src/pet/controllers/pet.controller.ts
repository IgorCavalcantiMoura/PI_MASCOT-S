import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Pet } from "../entities/pet.entity";
import { PetService } from "../services/pet.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Pet')
@ApiBearerAuth()
@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Pet[]> {
        return await this.petService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Pet> {
        return await this.petService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    async findByName(@Param('nome') nome: string): Promise<Pet[]> {
        return await this.petService.findByName(nome);
    }

    @UseGuards(JwtAuthGuard)
    @Get('genero/:genero')
    async findByGenero(@Param('genero') genero: string): Promise<Pet[]> {
        return await this.petService.findByGenero(genero);
    }

    @UseGuards(JwtAuthGuard)
    @Get('especie/:especie')
    async findByEspecie(@Param('especie') especie: string): Promise<Pet[]> {
        return await this.petService.findByEspecie(especie);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() pet: Pet): Promise<Pet> {
        return await this.petService.create(pet);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() pet: Pet): Promise<Pet> { 
        return this.petService.update(pet)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.petService.delete(id);
    }
}
