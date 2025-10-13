import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { ParkingType } from './entities/parking-type.entity';

@Injectable()
export class ParkingTypeService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,) {}
  async findAll(): Promise<ParkingType[]> {
    const { data, error } = await this.supabase.from('ParkingType').select('*');
    if (error) throw error;
    return data || [];
  }

  async findOne(id: string): Promise<ParkingType> {
    const { data, error } = await this.supabase.from('ParkingType').select('*').eq('id', id).single();
    if (error) throw new NotFoundException(error.message);
    return data;
  }

  async create(type: Partial<ParkingType>) {
    const { data, error } = await this.supabase.from('ParkingType').insert(type).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updates: Partial<ParkingType>) {
    const { data, error } = await this.supabase.from('ParkingType').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('ParkingType').delete().eq('id', id);
    if (error) throw error;
    return { message: `ParkingType ${id} deleted successfully` };
  }

}
