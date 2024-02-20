import { Body, Controller, Inject, Post } from '@nestjs/common';
import SWAGGER_TAGS from 'src/constant/swagger/tags';
import { RefreshTokenDto } from './dto/token.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicApi } from 'src/decorator/public.decorator';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller('auth')
export class AuthController {
    @Inject()
    private authService: AuthService;

    @ApiOperation({ summary: '刷新 token' })
    @PublicApi()
    @Post()
    refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body);
    }
}