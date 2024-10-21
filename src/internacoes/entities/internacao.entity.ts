import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Veterinario } from '../../veterinario/entities/veterianario.entity';
import { Pet } from '../../pet/entities/pet.entity';
import { BoletimMedico } from '../../boletim_medico/entities/boletimMedico.entity';


@Entity({ name: 'tb_internacao' })
export class Internacao {
    @ApiProperty({ description: 'ID da internação', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Data e hora de internação', example: '2024-10-20T10:00:00Z' })
    @Column()
    dataHoraInternacao: string;

    @ApiProperty({ description: 'Data e hora de alta', example: 'Não liberado' })
    @Column({ nullable: true, default: 'Não liberado' }) 
    dataHoraAlta: string;

    @ApiProperty({ description: 'Motivo da internação', example: 'Cirurgia de emergência' })
    @Column({ length: 255 })
    motivo: string;

    @ApiProperty({ description: 'Gaiola que o animal está internado', example: 1 })
    @Column()
    gaiola: number;

    @ApiProperty({ description: 'Observações sobre a internação', example: 'O paciente apresentou boa recuperação.' })
    @Column({ length: 1000, nullable: true }) // Permite que o campo seja nulo
    observacoes: string;

    @ApiProperty({ description: 'Pet que está internado' })
    @ManyToOne(() => Pet, { eager: true })
    @JoinColumn({ name: 'petId' })
    pet: Pet;

    @ApiProperty({ description: 'Veterinário responsável pela internação' })
    @ManyToOne(() => Veterinario, { eager: true })
    @JoinColumn({ name: 'veterinarioId' })
    veterinario: Veterinario;

    @ApiProperty({ description: 'Boletins médicos associados à internação' })
    @OneToMany(() => BoletimMedico, boletimMedico => boletimMedico.internacao)
    boletinsMedicos: BoletimMedico[];
}
