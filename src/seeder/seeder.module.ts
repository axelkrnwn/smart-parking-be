import { Logger, Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { SupabaseModule } from 'src/connection/supabase';

@Module({
    imports: [SupabaseModule],
    providers: [Seeder, Logger],
  })
  export class SeederModule {}