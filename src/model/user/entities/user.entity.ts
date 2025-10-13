import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Parking } from 'src/model/parking/entities/parking.entity';

@Entity('User')
export class User {
  @PrimaryColumn({ name: 'id', length: 20 })
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

}
