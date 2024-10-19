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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Veterinarios')
@ApiBearerAuth()
@Controller('/veterinarios')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}


  @Get()
  async findAll(): Promise<Veterinario[]> {
    return await this.veterinarioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Veterinario> {
    return await this.veterinarioService.findById(id);
  }

  @Get('/nome/:nome')
  async findByName(@Param('nome') nome: string): Promise<Veterinario[]> {
    return await this.veterinarioService.findByName(nome);
  }

  @Get('/especialidade/:especialidade')
  async findByEspecialidade(
    @Param('especialidade') especialidade: string,
  ): Promise<Veterinario[]> {
    return await this.veterinarioService.findByEspecialidade(especialidade);
  }

  
  @Get('/registro/:registroConselho')
  async findByRegistro(
    @Param('registroConselho') registroConselho: string,
  ): Promise<Veterinario[]> {
    return await this.veterinarioService.findByRegistro(registroConselho);
  }

  @Post()
  async create(@Body() veterinario: Veterinario): Promise<Veterinario> {
    return await this.veterinarioService.create(veterinario);
  }

  @Put()
  async update(@Body() veterinario: Veterinario): Promise<Veterinario> {
    return await this.veterinarioService.update(veterinario);
  }

  @Delete(':id')
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
