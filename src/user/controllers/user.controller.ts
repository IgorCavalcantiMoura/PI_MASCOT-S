import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@ApiTags('User')
@Controller("/user")
export class UserController{

    constructor(private readonly usuarioService: UserService){ }
   
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]>{
        return this.usuarioService.findAll();
    }
    
   
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.usuarioService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: User): Promise<User>{
        return this.usuarioService.create(usuario)
    }

   
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: User): Promise<User>{
        return this.usuarioService.update(usuario)
    }

}