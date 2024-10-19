import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_donos_pet')
export class DonoPet {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 100, nullable: false })
    nome: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 14, nullable: false })
    cpf: string;


    @ApiProperty({ example: 'email@email.com.br' })
    @Column({ type: 'varchar', length: 100, nullable: true })
    email: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 15, nullable: true })
    telefone: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 200, nullable: true })
    endereco: string;
}
