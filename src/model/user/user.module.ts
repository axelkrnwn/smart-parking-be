import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseModule } from 'src/connection/supabase';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SupabaseModule, JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
          }),
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
