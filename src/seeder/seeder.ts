import { Inject, Injectable, Logger } from "@nestjs/common";

import { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { ParkingType } from "src/model/parking-type/entities/parking-type.entity";
import { User } from "src/model/user/entities/user.entity";
import { Hasher } from "src/util/hash";

@Injectable()
export class Seeder {
  
    constructor(
        @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
        private readonly logger: Logger
    ){}

    async seed() {
        const adminUser:User = {
            email: 'admin@smartparking.com',
            id: 'B0000AAA',
            password: await Hasher.hash("admin123"),
            username: 'admin',
        }
        try {
            await this.supabase.from('User').insert(adminUser)
            this.logger.log("Successfully insert user")
        } catch (error) {
            this.logger.error(`${error}`)
        }
        const parkingTypes: ParkingType[] = [
            {
                id: randomUUID(),
                vehicletype: "car",
                first: 4000,
                second: 3000,
            },
            {
                id: randomUUID(),
                vehicletype: "truck",
                first: 5000,
                second: 4000,
                third: 3000,
            }
        ]
        try {
            await Promise.all(parkingTypes.map(e => this.supabase.from('ParkingType').insert(e)))
            this.logger.log("Successfully insert parking types")
        } catch (error) {
            this.logger.error(`${error}`)
        }
    }
}