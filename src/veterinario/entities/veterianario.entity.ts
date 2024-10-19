import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: "tb_veterinario"})
export class Veterinario {
    @ApiProperty({ description: 'ID do veterinário', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome completo do veterinário', example: 'Dr. João Silva' })
    @Column({ length: 100 })
    nome: string;

    @ApiProperty({ description: 'Especialidade do veterinário', example: 'Dermatologia' })
    @Column({ length: 50 })
    especialidade: string;

    @ApiProperty({ description: 'Número do registro do conselho de veterinária', example: 'CRMV-12345' })
    @Column({ length: 20 })
    registroConselho: string;

    @ApiProperty({ description: 'E-mail do veterinário', example: 'veterinario@exemplo.com' })
    @Column({ length: 100, unique: true })
    email: string;

    @ApiProperty({ description: 'Telefone do veterinário', example: '(81) 98765-4321' })
    @Column({ length: 15 })
    telefone: string;

}
