import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IAccessTokenParams, IRefreshTokenParams } from "src/types/auth";

@Injectable()
export class AuthService {
    @Inject()
    private jwtService: JwtService

    @Inject()
    private configService: ConfigService

    getAccessToken(data: IAccessTokenParams) {
        return this.jwtService.sign(data, {
            secret: this.configService.get('jwt.accessTokenExpiresIn')
        })
    }

    getRefreshToken(data: IRefreshTokenParams) {
        return this.jwtService.sign(data, {
            secret: this.configService.get('jwt.refreshTokenExpiresIn')
        })
    }
}