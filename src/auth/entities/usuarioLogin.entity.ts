import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsuarioLogin {
  @ApiProperty({
    // description: 'Nome de usuário ou e-mail para login',
    // example: 'email@email.com.br',
  })
  // @IsString({ message: 'O nome de usuário deve ser uma string.' })
  // @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  public usuario: string;

  @ApiProperty({
    // description: 'Senha do usuário (mínimo de 8 caracteres)',
    // example: 'senhaSegura123',
  })
  // @IsString({ message: 'A senha deve ser uma string.' })
  // @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  // @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  public senha: string;
}
