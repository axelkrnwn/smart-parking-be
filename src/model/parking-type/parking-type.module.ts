import { Module } from '@nestjs/common';
import { ParkingTypeService } from './parking-type.service';
import { ParkingTypeController } from './parking-type.controller';
import { SupabaseModule } from 'src/connection/supabase';

@Module({
  imports: [SupabaseModule],
  controllers: [ParkingTypeController],
  providers: [ParkingTypeService],
})
export class ParkingTypeModule {}
