import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_administradores')
export class Administrador {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({length: 100, nullable: false })
  nome: string;

  @ApiProperty({example: "email@email.com.br"})
  @Column({length: 100, nullable: true })
  email: string;

  @ApiProperty()
  @Column({length: 15, nullable: true })
  telefone: string;
}
