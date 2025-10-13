import { Inject, Injectable, Logger } from "@nestjs/common";

import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "src/model/user/entities/user.entity";
import { Hasher } from "src/util/hash";

@Injectable()
export class Seeder {
  
    constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,){}

    async seed() {

        const adminUser:User = {
            email: 'admin@smartparking.com',
            id: 'B0000AAA',
            password: await Hasher.hash("admin123"),
            username: 'admin',
        }
        return await this.supabase.from('User').insert(adminUser)

        // const user = this.repository.create({
        //     "username":"admin",
        //     "email":process.env.ADMIN_EMAIL,
        //     "password": await Hasher.hash(process.env.ADMIN_PASSWORD ?? ""),
        //     "role":"admin",
        //     "address":"-"
        // })
        // const user2 = this.repository.create({
        //     "username":"dummy",
        //     "email":"dummy@gmail.com",
        //     "password": await Hasher.hash("dummy123"),
        //     "role":"student",
        //     "address":"123 Address St."
        // })

        // await this.repository.save(user)
        // await this.repository.save(user2)
    }
}