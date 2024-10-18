import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
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
    findAll(): Promise<Administrador[]> {
        return this.administradorService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Administrador> {
        return this.administradorService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Administrador[]> { 
        return this.administradorService.findByName(nome)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() administrador: Administrador): Promise<Administrador>{
        return this.administradorService.create(administrador)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() administrador: Administrador): Promise<Administrador> { 
        return this.administradorService.update(administrador)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.administradorService.delete(id)
    }

}

