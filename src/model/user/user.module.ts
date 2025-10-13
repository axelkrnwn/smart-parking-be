import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseModule } from 'src/connection/supabase';

@Module({
  imports: [SupabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
