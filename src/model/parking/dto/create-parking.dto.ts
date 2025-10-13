import { ApiProperty } from "@nestjs/swagger"

export class CreateParkingDto {
    @ApiProperty()
    userid: string
    @ApiProperty()
    parkingtypeid: string
}
