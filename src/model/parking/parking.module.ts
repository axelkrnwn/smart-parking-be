import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { UserService } from '../user/user.service';
import { EmailService } from 'src/email/email.service';
import { SupabaseModule } from 'src/connection/supabase';

@Module({
    imports: [SupabaseModule],
    controllers: [ParkingController],
    providers: [ParkingService, UserService, EmailService],
})
export class ParkingModule {}
