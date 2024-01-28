import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDetailDto {
    constructor(data: Partial<UserDetailDto>) {
        Object.assign(this, data);
    }

    /** id */
    @ApiProperty({ description: '用户Id', default: 1 })
    @Expose()
    id: number;

    /** 昵称 */
    @ApiProperty({ description: '用户昵称', default: '昵称' })
    @Expose()
    nickname: string;

    /** 头像 */
    @ApiProperty({ description: '头像', default: 'http://avatar.com' })
    @Expose()
    avatar: string;

    /** 邮箱 */
    @ApiProperty({ description: '邮箱', default: 'aaa@aaa.com' })
    @Expose()
    email: string;

}

export class UserTokenDetailDto extends UserDetailDto {
    constructor(data: Partial<UserTokenDetailDto>) {
        super(data);
        Object.assign(this, data);
    }

    /** token */
    @ApiProperty({ description: '访问 token', default: 'accessToken' })
    @Expose()
    accessToken: string;

    /** refreshToken */
    @ApiProperty({ description: '刷新 token 的token', default: 'refreshToken' })
    @Expose()
    refreshToken: string;
}