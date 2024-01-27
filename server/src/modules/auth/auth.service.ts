import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IAccessTokenParams, IRefreshToken, IRefreshTokenParams, ITokenResponse } from "src/types/auth";
import { RefreshTokenDto } from "./dto/token.dto";
import { AUTH_INVALID } from "src/constant/exception/auth";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    @Inject()
    private jwtService: JwtService

    @Inject()
    private configService: ConfigService

    getAccessToken(data: IAccessTokenParams) {
        return this.jwtService.sign(data, {
            expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
            secret: this.configService.get('jwt.accessTokenSecret')
        })
    }

    getRefreshToken(data: IRefreshTokenParams) {
        return this.jwtService.sign(data, {
            expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
            secret: this.configService.get('jwt.refreshTokenSecret')
        })
    }

    refreshToken(data: RefreshTokenDto) {
        try {
            const effectiveData = this.jwtService.verify(data.accessToken, {
                secret: this.configService.get('jwt.refreshTokenSecret')
            })
    
            const response: ITokenResponse = {
                accessToken: this.getRefreshToken({ userId: effectiveData.userId }),
                refreshToken: this.getRefreshToken({ userId: effectiveData.userId }),
            }
    
            return response;
        } catch {
            throw new UnauthorizedException(AUTH_INVALID)
        }
       

    }

      /** 密码加密 */
      encryptPassword(password: string) {
        return bcrypt.hashSync(password, this.configService.get('passwordSlat'))
    }
    
    comparePassword(password: string, localPassword: string) {
        return bcrypt.compareSync(password, localPassword);
    }
}