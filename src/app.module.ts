import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './model/parking/parking.module';
import { ParkingTypeModule } from './model/parking-type/parking-type.module';
import { SupabaseModule } from './connection/supabase';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './model/user/user.module';

@Module({
  imports: [SupabaseModule, ParkingModule, ParkingTypeModule, SeederModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
