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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('DonoPet')
@ApiBearerAuth()
@Controller('/dono-pet')
export class DonoPetController {
  constructor(private readonly donoPetService: DonoPetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<DonoPet[]> {
    return this.donoPetService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<DonoPet> {
    return this.donoPetService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<DonoPet[]> {
    return this.donoPetService.findByName(nome);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('email') email: string): Promise<DonoPet[]> {
    return this.donoPetService.findByEmail(email);
  }

  @Get('/cpf/:cpf')
  @HttpCode(HttpStatus.OK)
  findByCpf(@Param('cpf') cpf: string): Promise<DonoPet[]> {
    return this.donoPetService.findByCpf(cpf);
  }

  @Get('/telefone/:telefone')
  @HttpCode(HttpStatus.OK)
  findByTelefone(@Param('telefone') telefone: string): Promise<DonoPet[]> {
    return this.donoPetService.findByTelefone(telefone);
  }

  @Get('/endereco/:endereco')
  @HttpCode(HttpStatus.OK)
  findByEndereco(@Param('endereco') endereco: string): Promise<DonoPet[]> {
    return this.donoPetService.findByEndereco(endereco);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updatePartial(
    @Param('id') id: number,
    @Body() partialUpdate: Partial<DonoPet>,
  ): Promise<DonoPet> {
    return this.donoPetService.updatePartial(id, partialUpdate);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() donoPet: DonoPet): Promise<DonoPet> {
    return this.donoPetService.create(donoPet);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() donoPet: DonoPet): Promise<DonoPet> {
    return this.donoPetService.update(donoPet);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.donoPetService.delete(id);
  }
}
