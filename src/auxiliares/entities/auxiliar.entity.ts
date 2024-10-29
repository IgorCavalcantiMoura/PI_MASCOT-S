import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_auxiliares')
export class Auxiliar {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do auxiliar',
    example: 'João Silva',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(1, 100, { message: 'O nome deve ter entre 1 e 100 caracteres.' })
  @Column({ length: 100, nullable: false })
  nome: string;

  @ApiProperty({
    description: 'Email do auxiliar',
    example: 'email@email.com.br',
  })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @IsOptional()
  @Length(0, 100, { message: 'O email deve ter no máximo 100 caracteres.' })
  @Column({ length: 100, nullable: true })
  email: string;

  @ApiProperty({
    description: 'Telefone do auxiliar',
    example: '(99) 99999-9999',
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsOptional()
  @Length(0, 15, { message: 'O telefone deve ter no máximo 15 caracteres.' })
  @Column({ length: 15, nullable: true })
  telefone: string;
}
