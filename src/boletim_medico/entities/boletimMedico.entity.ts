import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Internacao } from '../../internacoes/entities/internacao.entity';


@Entity({ name: 'tb_boletim_medico' })
export class BoletimMedico {
    @ApiProperty({ description: 'ID do boletim médico', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Descrição do boletim médico', example: 'Paciente estável, sem febre.' })
    @Column({ length: 1000 })
    descricao: string;

    @ApiProperty({ description: 'Data do boletim', example: '2024-10-21' })
    @Column({ type: 'date' })
    data: string;

    @ApiProperty({ description: 'Temperatura corporal do paciente em graus Celsius', example: 36.5 })
    @Column({ type: 'float', nullable: true })
    temperatura: number;

    @ApiProperty({ description: 'Pressão arterial do paciente', example: '120/80' })
    @Column({ length: 20, nullable: true })
    pressaoArterial: string;

    @ApiProperty({ description: 'Status do paciente', example: 'Estável' })
    @Column({
        type: 'enum',
        enum: ['Estável', 'Crítico', 'Em recuperação', 'Observação'],
        default: 'Observação',
    })
    statusPaciente: string;

    @ApiProperty({ description: 'Outras observações relevantes', example: 'Paciente apresentou melhora após administração de medicação.' })
    @Column({ length: 1000, nullable: true })
    observacoes: string;

    @ApiProperty({ description: 'Internação relacionada ao boletim médico' })
    @ManyToOne(() => Internacao, { eager: true })
    @JoinColumn({ name: 'internacaoId' })
    internacao: Internacao;
}
