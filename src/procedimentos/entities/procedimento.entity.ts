import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Consulta } from '../../consultas/entities/consulta.entity';


@Entity('tb_procedimentos')
export class Procedimento {
    @ApiProperty({
        description: 'Identificador único do procedimento',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nome do procedimento',
        example: 'Consulta de rotina',
        maxLength: 255,
    })
    @Column({ length: 255, nullable: false })
    nome: string;

    @ApiProperty({
        description: 'Descrição do procedimento',
        example: 'Consulta veterinária padrão para avaliação de saúde',
        nullable: true,
    })
    @Column('text', { nullable: true })
    descricao: string;

    @ApiProperty({
        description: 'Preço do procedimento',
        example: 150.00,
    })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    preco: number;

    @ApiProperty({
        description: 'Consulta associada a este procedimento',
    })
    @ManyToOne(() => Consulta, (consulta) => consulta.procedimentos, { nullable: false })
    consulta: Consulta;
}
