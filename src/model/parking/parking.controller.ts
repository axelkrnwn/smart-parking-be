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

    let user = await this.userService.findOne(createParkingDto.userid)
    let parkings = await this.parkingService.findByUserId(createParkingDto.userid)
    if (parkings.length < 1){
      let parking = new Parking()
      parking.id = randomUUID()
      parking.start = new Date()
      parking.parkingtypeid = createParkingDto.parkingtypeid
      parking.userid = createParkingDto.userid
      try {
        await this.parkingService.create(parking)
        
        await this.emailService.sendEmail(
          user.email, 
          "Enter parking success", 
          `Your vehicle with plat number ${parking.userid} has been entered at ${parking.start.toISOString()}`
        )
      } catch (error) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, HttpStatus.BAD_REQUEST, {
            cause: error
        }); 
      }
    }else {
      let parking = new Parking()
      parking.id = parkings[0].id
      parking.start = new Date(parkings[0].start)
      parking.parkingtypeid = createParkingDto.parkingtypeid
      parking.userid = createParkingDto.userid
      parking.end = new Date()
      try {
        await this.parkingService.update(parking.id, parking)
        
        await this.emailService.sendEmail(
          user.email, 
          "Leaving parking success", 
          `Your vehicle with plat number ${parking.userid} has leave at ${parking.start.toISOString()}`
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

    
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }
  
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.parkingService.findByUserId(id);
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
