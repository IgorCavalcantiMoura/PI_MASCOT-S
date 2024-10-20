import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Veterinario } from '../../veterinario/entities/veterianario.entity';
import { DonoPet } from '../../dono_pet/entities/donoPet.entity';
import { Pet } from '../../pet/entities/pet.entity';

@Entity({name: "tb_consulta"})
export class Consulta {
    @ApiProperty({ description: 'ID da consulta', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Data e hora da consulta', example: '2024-10-20T10:00:00Z' })
    @Column()
    dataHora: string;

    @ApiProperty({ description: 'Descrição da consulta', example: 'Consulta de rotina' })
    @Column({ length: 255 })
    descricao: string;

    @ApiProperty({ description: 'Estado do animal durante a consulta', example: 'Estável' })
    @Column({ length: 50 })
    estado_animal: string;

    @ApiProperty({ description: 'Diagnóstico feito pelo veterinário', example: 'Alergia' })
    @Column({ length: 255 })
    diagnostico: string;

    @ApiProperty({ description: 'Tratamento sugerido pelo veterinário', example: 'Antihistamínico' })
    @Column({ length: 1000 })
    tratamento_sugerido: string;

    @ApiProperty({ description: 'Veterinário responsável pela consulta' })
    @ManyToOne(() => Veterinario, { eager: true })
    @JoinColumn({ name: 'veterinarioId' })
    veterinario: Veterinario;

    @ApiProperty({ description: 'Dono do pet que realiza a consulta' })
    @ManyToOne(() => DonoPet, { eager: true })
    @JoinColumn({ name: 'donoPetId' })
    donoPet: DonoPet;

    @ApiProperty({ description: 'Pet que irá passar pela consulta' })
    @ManyToOne(() => Pet, { eager: true })
    @JoinColumn({ name: 'petId' })
    pet: Pet;
}