import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VeterinarioService } from '../services/veterinario.service';
import { Veterinario } from '../entities/veterianario.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Veterinarios')
@ApiBearerAuth()
@Controller('/veterinarios')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}


  @Get()
  @ApiOperation({ summary: 'Obter todos os veterinários' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de veterinários obtida com sucesso.' })
  async findAll(): Promise<Veterinario[]> {
    return await this.veterinarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter veterinário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do veterinário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Veterinário obtido com sucesso.' })
  async findById(@Param('id') id: number): Promise<Veterinario> {
    return await this.veterinarioService.findById(id);
  }

  @Get('/nome/:nome')
  @ApiOperation({ summary: 'Obter veterinários pelo nome' })
  @ApiParam({ name: 'nome', description: 'Nome do veterinário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de veterinários com o nome fornecido obtida com sucesso.' })
  async findByName(@Param('nome') nome: string): Promise<Veterinario[]> {
    return await this.veterinarioService.findByName(nome);
  }

  @Get('/especialidade/:especialidade')
  @ApiOperation({ summary: 'Obter veterinários pela especialidade' })
  @ApiParam({ name: 'especialidade', description: 'Especialidade do veterinário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de veterinários com a especialidade fornecida obtida com sucesso.' })
  async findByEspecialidade(
    @Param('especialidade') especialidade: string,
  ): Promise<Veterinario[]> {
    return await this.veterinarioService.findByEspecialidade(especialidade);
  }

  
  @Get('/registro/:registroConselho')
  @ApiOperation({ summary: 'Obter veterinários pelo registro do conselho' })
  @ApiParam({ name: 'registroConselho', description: 'Registro do conselho do veterinário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de veterinários com o registro fornecido obtida com sucesso.' })
  async findByRegistro(
    @Param('registroConselho') registroConselho: string,
  ): Promise<Veterinario[]> {
    return await this.veterinarioService.findByRegistro(registroConselho);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo veterinário' })
  @ApiBody({ description: 'Dados do novo veterinário', type: Veterinario })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Veterinário criado com sucesso.' })
  async create(@Body() veterinario: Veterinario): Promise<Veterinario> {
    return await this.veterinarioService.create(veterinario);
  }

  @Put()
  @ApiOperation({ summary: 'Cadastrar um novo veterinário' })
  @ApiBody({ description: 'Dados do novo veterinário', type: Veterinario })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Veterinário criado com sucesso.' })
  async update(@Body() veterinario: Veterinario): Promise<Veterinario> {
    return await this.veterinarioService.update(veterinario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um veterinário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do veterinário a ser excluído' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Veterinário excluído com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Veterinário não encontrado.' })
  async delete(@Param('id') id: number): Promise<void> {
    const deleteResult = await this.veterinarioService.delete(id);
    if (!deleteResult.affected) {
      throw new HttpException(
        'Veterinário não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
