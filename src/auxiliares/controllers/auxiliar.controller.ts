import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuxiliarService } from "../services/auxiliar.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Auxiliar } from "../entities/auxiliar.entity";

@ApiTags('Auxiliar')
@Controller("/auxiliar")
@ApiBearerAuth()
export class AuxiliarController {
    constructor(private readonly auxiliarService: AuxiliarService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Auxiliar[]> {
        return this.auxiliarService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Auxiliar> {
        return this.auxiliarService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Auxiliar[]> { 
        return this.auxiliarService.findByName(nome)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() auxiliar: Auxiliar): Promise<Auxiliar>{
        return this.auxiliarService.create(auxiliar)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() auxiliar: Auxiliar): Promise<Auxiliar> { 
        return this.auxiliarService.update(auxiliar)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.auxiliarService.delete(id)
    }

}