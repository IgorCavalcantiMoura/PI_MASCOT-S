import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_produto_estoque')
export class ProdutoEstoque {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Vacina Antirrábica' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @ApiProperty({ example: 'Medicamento' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  tipo: string;

  @ApiProperty({ example: 100 })
  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @ApiProperty({ example: '2024-10-18' })
  @Column({ type: 'date', nullable: true })
  dataValidade: Date;

  @ApiProperty({ example: 'Lote 12345' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  lote: string;
}
