import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Usuario')
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter todos os usuários' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuários obtidos com sucesso.' })
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter usuário pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser obtido' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuário obtido com sucesso.' })
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar um novo usuário' })
    @ApiBody({ description: 'Dados do novo usuário', type: Usuario })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado com sucesso.' })
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiBody({ description: 'Dados atualizados do usuário', type: Usuario })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuário atualizado com sucesso.' })
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

}