import { Inject, Injectable } from '@nestjs/common';
import { CreateParkingTypeDto } from './dto/create-parking-type.dto';
import { UpdateParkingTypeDto } from './dto/update-parking-type.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ParkingTypeService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,) {}

  async create(createParkingTypeDto: CreateParkingTypeDto) {
    await this.supabase.from('parkingTypes').insert(createParkingTypeDto)
    return 'This action adds a new parkingType';
  }

  findAll() {
    return `This action returns all parkingType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingType`;
  }

  update(id: number, updateParkingTypeDto: UpdateParkingTypeDto) {
    return `This action updates a #${id} parkingType`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingType`;
  }
}
