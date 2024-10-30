import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pet } from '../../pet/entities/pet.entity';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@Entity('tb_donos_pet')
export class DonoPet {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do dono do pet',
    example: 'Maria da Silva',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(1, 100, { message: 'O nome deve ter entre 1 e 100 caracteres.' })

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @ApiProperty({
    description: 'CPF do dono do pet',
    example: '123.456.789-09',
  })
  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres.' })
  @Column({ type: 'varchar', length: 14, nullable: false })
  cpf: string;

  @ApiProperty({ example: 'email@email.com.br' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @Length(0, 100, { message: 'O email deve ter no máximo 100 caracteres.' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Telefone do dono do pet',
    example: '(99) 99999-9999',
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Column({ type: 'varchar', length: 15, nullable: false })
  telefone: string;

  @ApiProperty({
    description: 'Endereço do dono do pet',
    example: 'Rua das Flores, 123',
  })
  @IsString({ message: 'O endereço deve ser uma string.' })
  @IsOptional()
  @Length(0, 200, { message: 'O endereço deve ter no máximo 200 caracteres.' })
  @Column({ type: 'varchar', length: 200, nullable: true })
  endereco: string;
  
  @ApiProperty({ type: () => Pet })
  @OneToMany(() => Pet, (pet) => pet.donoPet, { eager: true })
  pet: Pet[];
}
