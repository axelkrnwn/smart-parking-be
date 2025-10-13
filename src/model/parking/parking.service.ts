import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async create(parking: Partial<Parking>) {
    const { data, error } = await this.supabase.from('Parking').insert(parking).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updates: Partial<Parking>) {
    const { data, error } = await this.supabase.from('Parking').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('Parking').delete().eq('id', id);
    if (error) throw error;
    return { message: `Parking ${id} deleted successfully` };
  }
async findAll(): Promise<Parking[]> {
    const { data, error } = await this.supabase
      .from('Parking')
      .select('*, User(*), ParkingType(*)');
    if (error) throw error;
    return data || [];
  }

  async findOne(id: string): Promise<Parking> {
    const { data, error } = await this.supabase
      .from('Parking')
      .select('*, User(*), ParkingType(*)')
      .eq('id', id)
      .single();
    if (error) throw new NotFoundException(error.message);
    return data;
  }

}
