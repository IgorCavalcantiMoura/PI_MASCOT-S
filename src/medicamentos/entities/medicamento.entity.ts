import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'tb_medicamento' })
export class Medicamento {
    @ApiProperty({ description: 'ID do medicamento', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do medicamento', example: 'Amoxicilina' })
    @Column({ length: 100 })
    nome: string;

    @ApiProperty({ description: 'Observações adicionais sobre o medicamento', example: 'Administrar após as refeições' })
    @Column({ length: 255, nullable: true })
    observacoes: string;

    @ApiProperty({ description: 'Nome do fabricante', example: 'Abbott' })
    @Column({ length: 100 })
    laboratorio: string

}
