import { Module } from '@nestjs/common';
import { ParkingTypeService } from './parking-type.service';
import { ParkingTypeController } from './parking-type.controller';

@Module({
  controllers: [ParkingTypeController],
  providers: [ParkingTypeService],
})
export class ParkingTypeModule {}
