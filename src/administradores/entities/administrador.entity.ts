import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_administradores')
export class Administrador {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do administrador',
    example: 'João da Silva',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(1, 100, { message: 'O nome deve ter entre 1 e 100 caracteres.' })
  @Column({length: 100, nullable: false })
  nome: string;

  @ApiProperty({
    description: 'Email',
    example: 'email@email.com.br',
  })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @IsOptional()
  @Length(0, 100, { message: 'O email deve ter no máximo 100 caracteres.' })
  @Column({ length: 100, nullable: true })
  email: string;

  @ApiProperty({ example: '999999999' })
  @IsOptional()
  @Column({length: 15, nullable: true })
  telefone: string;
}
