import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DonoPet } from '../../dono_pet/entities/donoPet.entity';

@Entity('pet')
export class Pet {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @ApiProperty({example: "Cachorro, Gato, etc."})
  @Column({ type: 'varchar', length: 50, nullable: false })
  especie: string; 

  @ApiProperty({example: "Labrador, Siamês, etc."})
  @Column({ type: 'varchar', length: 50, nullable: true })
  raca: string;

  @ApiProperty({description: "Idade em anos"})
  @Column({ type: 'int', nullable: true })
  idade: number;

  @ApiProperty({description: "icone animal"})
  @Column({ type: 'varchar', nullable: true })
  type: string;

  @ApiProperty({description: "Peso em kg"})
  @Column({ type: 'float', nullable: true })
  peso: number; 

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['Macho', 'Fêmea', 'OUTRO'],
    default: 'OUTRO',
  })
  genero: string;

  @ApiProperty({ type: () => DonoPet })
  @ManyToOne(() => DonoPet, (donoPet) => donoPet.pet, {
    onDelete: 'CASCADE'
  })
  donoPet: DonoPet; 
}
