import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/model/user/entities/user.entity';
import { ParkingType } from 'src/model/parking-type/entities/parking-type.entity';

@Entity('Parking')
export class Parking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp', nullable: true })
  end: Date | null;

}
