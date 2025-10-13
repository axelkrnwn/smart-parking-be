import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Hasher{
    static saltOrRounds: number = 10;
    
    static verify = async (password:string, hashed:string) => {
        return await bcrypt.compare(password, hashed);
    }
    static hash = async (password:string) => {
        const hashPass = await bcrypt.hash(password, this.saltOrRounds)
        return hashPass
    }
}