import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
      @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ){}

  async create(user: Partial<User>) {
    const { data, error } = await this.supabase.from('User').insert(user).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await this.supabase.from('User').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('User').delete().eq('id', id);
    if (error) throw error;
    return { message: `User ${id} deleted successfully` };
  }


  async findAll(): Promise<User[]> {
    const { data, error } = await this.supabase.from('User').select('*');
    if (error) throw error;
    return data || [];
  }

  async findOne(id: string): Promise<User> {
    const { data, error } = await this.supabase.from('User').select('*').eq('id', id).single();
    if (error) throw new NotFoundException(error.message);
    return data;
  }
}
