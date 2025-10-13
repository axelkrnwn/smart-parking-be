import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEmailDto } from './dto/create-email.dto';
import { User } from './entities/user.entity';
import { Hasher } from 'src/util/hash';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import type { Request, Response } from 'express';
import { UserGuard } from './user.guard';

@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiResponse({ status: 200, description: 'The user has been successfully registered.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    async create(@Body() createUserDto: CreateUserDto) {
        let user = new User()
        user.email = createUserDto.email
        user.id = createUserDto.id
        user.password = await Hasher.hash(createUserDto.password)
        user.username = createUserDto.username
        try {
          return this.userService.create(user)
        } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, HttpStatus.BAD_REQUEST, {
              cause: error
          }); 
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The users has been fetched.'})
    findAll() {
      return this.userService.findAll();
    }

    @ApiBearerAuth('access_token')
    @UseGuards(UserGuard)
    @Get('me')
    @ApiCookieAuth('access_token')
    @ApiResponse({ status: 200, description: 'The user has been successfully fetched.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    @ApiResponse({ status: 401, description: 'Unauthorized user.'})
    async me(@Req() request: Request){
      // return request.
        const res = await request['user']
        return res
        // const user = await this.userService.findOne(res.id)
        // return user
    }
    
    @Get(':id')
    @ApiResponse({ status: 200, description: 'The user has been fetched.'})
    @ApiResponse({ status: 404, description: 'The user is not found.'})
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'The user has been updated.'})
    @ApiResponse({ status: 400, description: 'The user is not found or there is validations that does not satisfied.'})
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      updateUserDto.password = await Hasher.hash(updateUserDto.password)
      return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The user has been deleted.'})
    @ApiResponse({ status: 404, description: 'The user is not found.'})
    remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }

    
    @Post('login')
    @ApiResponse({ status: 200, description: 'The user has been successfully login.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    async login(@Body() loginDTO: LoginDTO, @Res() resp: Response){
        try {
            const res = await this.userService.login(loginDTO)

            resp.cookie('access_token', res.access_token, {
              httpOnly: true,  
              sameSite: 'strict',
              maxAge: 1000 * 60 * 60 * 24,
            });
            return resp.status(200).send({
              token: res.access_token,
              message: "Login success"
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
}
