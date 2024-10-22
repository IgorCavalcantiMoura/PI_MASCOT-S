import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Medicamento } from '../../medicamentos/entities/medicamento.entity';
import { Internacao } from '../../internacoes/entities/internacao.entity';


@Entity({ name: 'tb_admin_medicamentos' })
export class AdminMedicamentos {
    @ApiProperty({ description: 'ID da administração de medicamento', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Dosagem do medicamento administrado', example: '500mg' })
    @Column({ length: 50 })
    dosagem: string;

    @ApiProperty({ description: 'Frequência de administração', example: 'A cada 8 horas' })
    @Column({ length: 50 })
    frequencia: string;

    @ApiProperty({ description: 'Método de administração', example: 'Oral' })
    @Column({ length: 50 })
    metodo: string;

    @ApiProperty({ description: 'Data e hora da administração', example: '2024-10-21T10:00:00Z' })
    @Column()
    dataHoraAdministracao: string;

    @ApiProperty({ description: 'Observações sobre a administração do medicamento', example: 'Administrar com alimentos' })
    @Column({ length: 255, nullable: true })
    observacoes: string;

    @ApiProperty({ description: 'Medicamento administrado' })
    @ManyToOne(() => Medicamento, { eager: true })
    @JoinColumn({ name: 'medicamentoId' })
    medicamento: Medicamento;

    @ApiProperty({ description: 'Internação relacionada à administração do medicamento' })
    @ManyToOne(() => Internacao, { eager: true })
    @JoinColumn({ name: 'internacaoId' })
    internacao: Internacao;
}
