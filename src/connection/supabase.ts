import { Module, Global } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient => {
        const url = configService.get<string>('SUPABASE_URL') ?? "";
        const key = configService.get<string>('SUPABASE_KEY') ?? "";

        return createClient(url, key);
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
