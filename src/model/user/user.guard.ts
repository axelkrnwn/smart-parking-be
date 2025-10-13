import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Extract } from "src/util/extract";


@Injectable()
export class UserGuard implements CanActivate {

    constructor(private jwtService: JwtService){
        
    }
    async canActivate(context: ExecutionContext):Promise<boolean> {
       
        const req = context.switchToHttp().getRequest()
        const token = req.cookies["access_token"]
        // const token = Extract.tokenHeader(req.cookies)
        
        if (!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = this.jwtService.verifyAsync(
                token, {secret: process.env.JWT_SECRET}
            )
            console.log(payload)
            req['user'] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true
    }
}