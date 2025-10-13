import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from './entities/user.entity';
import { Hasher } from 'src/util/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
      @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
      private jwtService:JwtService
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

  async login(user: Partial<User>) {
    let {data, error} = await this.supabase.from("User").select("*").eq("email", user.email).single()
    if (error) throw new NotFoundException(error.message);

    if (!data){
            throw new Error("User not found")
        }
        const verify = await Hasher.verify(user.password!, data.password)
        if (!verify){
            throw new Error("Password incorrect")
        }
        const payload = {id:data.id, username:data.username}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

  }
}
