import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {

    
    @PrimaryGeneratedColumn() 
    @ApiProperty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"})
    usuario: string

    @ApiProperty()
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string

    @ApiProperty()
    @Column({length: 5000 }) 
    foto: string

}