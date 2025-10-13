import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Extract } from "src/util/extract";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private jwtService: JwtService){
        
    }
    async canActivate(context: ExecutionContext):Promise<boolean> {
       
        const req = context.switchToHttp().getRequest()
        const token = Extract.tokenHeader(req)

        if (!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token, {secret: process.env.JWT_SECRET}
            )
            if (payload.role != "admin"){
                
                throw new UnauthorizedException()
            }
            req['user'] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true
    }
}