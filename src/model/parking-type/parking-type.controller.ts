import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingTypeService } from './parking-type.service';
import { CreateParkingTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';

@Controller('parking-type')
export class ParkingTypeController {
  constructor(private readonly parkingTypeService: ParkingTypeService) {}

  @Post()
  create(@Body() createParkingTypeDto: CreateParkingTypeDto) {
    return this.parkingTypeService.create(createParkingTypeDto);
  }

  @Get()
  findAll() {
    return this.parkingTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingTypeDto: UpdateParkingTypeDto) {
    return this.parkingTypeService.update(+id, updateParkingTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingTypeService.remove(+id);
  }
}
