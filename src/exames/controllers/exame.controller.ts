import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';
import { Consulta } from '../../consultas/entities/consulta.entity';
import { Veterinario } from '../../veterinario/entities/veterianario.entity';

@Entity({ name: 'tb_exame' })
export class Exame {
    @ApiProperty({ description: 'ID do exame', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do exame', example: 'Hemograma completo' })
    @Column({ length: 100 })
    nome: string;

    @ApiProperty({ description: 'Descrição do exame', example: 'Exame para avaliar as células sanguíneas' })
    @Column({ length: 255 })
    descricao: string;

    @ApiProperty({ description: 'Resultado do exame', example: 'Normal' })
    @Column({ length: 1000 })
    resultado: string;

    @ApiProperty({ description: 'Data e hora em que o exame foi realizado', example: '2024-10-20T10:00:00Z' })
    @Column()
    dataHora: string;

    @ApiProperty({ description: 'Consulta associada ao exame' })
    @ManyToOne(() => Consulta, { eager: true })
    @JoinColumn({ name: 'consultaId' })
    consulta: Consulta;

    @ApiProperty({ description: 'Veterinário que solicitou o exame' })
    @ManyToOne(() => Veterinario, { eager: true })
    @JoinColumn({ name: 'veterinarioId' })
    veterinario: Veterinario;

    @ApiProperty({ description: 'Pet que passou pelo exame' })
    @ManyToOne(() => Pet, { eager: true })
    @JoinColumn({ name: 'petId' })
    pet: Pet;
}
