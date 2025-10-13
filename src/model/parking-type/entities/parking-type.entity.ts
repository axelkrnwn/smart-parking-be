import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parking } from 'src/model/parking/entities/parking.entity';

@Entity('ParkingType')
export class ParkingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  vehicletype: string;

  @Column({ length: 50 })
  first: number;

  @Column({ length: 50, nullable: true })
  second?: number;

  @Column({ length: 50, nullable: true })
  third?: number;

}
