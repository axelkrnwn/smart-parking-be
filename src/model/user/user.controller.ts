import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEmailDto } from './dto/create-email.dto';
import { User } from './entities/user.entity';
import { Hasher } from 'src/util/hash';

@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.password = await Hasher.hash(updateUserDto.password)
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
