import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {

    
    @PrimaryGeneratedColumn() 
    @ApiProperty({ description: 'Identificador único do usuário', example: 1 })
    id: number

    @ApiProperty({ description: 'Nome completo do usuário', example: 'João Silva' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    @Column({length: 255, nullable: false}) 
    nome: string

    
    @ApiProperty({ description: 'Endereço de e-mail do usuário', example: 'email@email.com.br' })
    @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
    @Column({length: 255, nullable: false })
    usuario: string

    @ApiProperty({ description: 'Senha do usuário (mínimo de 8 caracteres)', example: 'senhaSegura123' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @Column({length: 255, nullable: false }) 
    senha: string

    @ApiProperty({ description: 'URL da foto do usuário', example: 'http://exemplo.com/foto.jpg', required: false })
    @IsOptional()
    @Column({length: 5000 }) 
    foto: string

}