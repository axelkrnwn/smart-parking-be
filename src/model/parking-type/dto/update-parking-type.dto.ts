import { PartialType } from '@nestjs/swagger';
import { CreateParkingTypeDto } from './create-parking-type.dto';

export class UpdateParkingTypeDto extends PartialType(CreateParkingTypeDto) {}
