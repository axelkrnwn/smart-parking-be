import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { UserService } from '../user/user.service';
import { Parking } from './entities/parking.entity';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/email/email.service';

@Controller({
  path: 'parking',
  version: '1'
})
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() createParkingDto: CreateParkingDto) {

    let parking = new Parking()
    parking.id = randomUUID()
    parking.start = new Date()
    parking.parkingTypeId = createParkingDto.parkingTypeId
    parking.userId = createParkingDto.userId

    try {
      await this.parkingService.create(createParkingDto)
      let user = await this.userService.findOne(parking.userId)
      
      await this.emailService.sendEmail(
        user.email, 
        "Parking success", 
        `Your vehicle with plat number ${parking.userId} has been entered at ${parking.start.toISOString()}`
      )
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
    return this.parkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingService.remove(id);
  }
}
