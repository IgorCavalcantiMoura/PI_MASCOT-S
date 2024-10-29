import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { DonoPetService } from '../services/donoPet.service';
import { DonoPet } from '../entities/donoPet.entity';
import { DeleteResult } from 'typeorm';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('DonoPet')
@ApiBearerAuth()
@Controller('/dono-pet')
export class DonoPetController {
  constructor(private readonly donoPetService: DonoPetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter todos os registros de DonoPet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registros obtidos com sucesso.' })
  findAll(): Promise<DonoPet[]> {
    return this.donoPetService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter DonoPet pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do DonoPet a ser obtido' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findById(@Param('id') id: number): Promise<DonoPet> {
    return this.donoPetService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar DonoPet pelo nome' })
  @ApiParam({ name: 'nome', description: 'Nome do DonoPet a ser buscado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findByName(@Param('nome') nome: string): Promise<DonoPet[]> {
    return this.donoPetService.findByName(nome);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar DonoPet pelo email' })
  @ApiParam({ name: 'email', description: 'Email do DonoPet a ser buscado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findByEmail(@Param('email') email: string): Promise<DonoPet[]> {
    return this.donoPetService.findByEmail(email);
  }

  @Get('/cpf/:cpf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar DonoPet pelo CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do DonoPet a ser buscado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findByCpf(@Param('cpf') cpf: string): Promise<DonoPet[]> {
    return this.donoPetService.findByCpf(cpf);
  }

  @Get('/telefone/:telefone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar DonoPet pelo telefone' })
  @ApiParam({ name: 'telefone', description: 'Telefone do DonoPet a ser buscado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findByTelefone(@Param('telefone') telefone: string): Promise<DonoPet[]> {
    return this.donoPetService.findByTelefone(telefone);
  }

  @Get('/endereco/:endereco')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar DonoPet pelo endereço' })
  @ApiParam({ name: 'endereco', description: 'Endereço do DonoPet a ser buscado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro obtido com sucesso.' })
  findByEndereco(@Param('endereco') endereco: string): Promise<DonoPet[]> {
    return this.donoPetService.findByEndereco(endereco);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar parcialmente DonoPet pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do DonoPet a ser atualizado' })
  @ApiBody({ description: 'Dados para atualização parcial', type: DonoPet })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro atualizado com sucesso.' })
  updatePartial(
    @Param('id') id: number,
    @Body() partialUpdate: Partial<DonoPet>,
  ): Promise<DonoPet> {
    return this.donoPetService.updatePartial(id, partialUpdate);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo DonoPet' })
  @ApiBody({ description: 'Dados do novo DonoPet', type: DonoPet })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Registro criado com sucesso.' })
  create(@Body() donoPet: DonoPet): Promise<DonoPet> {
    return this.donoPetService.create(donoPet);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar DonoPet' })
  @ApiBody({ description: 'Dados completos para atualização', type: DonoPet })
  @ApiResponse({ status: HttpStatus.OK, description: 'Registro atualizado com sucesso.' })
  update(@Body() donoPet: DonoPet): Promise<DonoPet> {
    return this.donoPetService.update(donoPet);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir DonoPet pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do DonoPet a ser excluído' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Registro excluído com sucesso.' })
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.donoPetService.delete(id);
  }
}
