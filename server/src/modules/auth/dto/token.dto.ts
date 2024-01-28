import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ default: 1, description: '用户 id' })
    userId: number;

    @ApiProperty({ default: 'token 字符串', description: 'accessToken' })
    accessToken: string;
}