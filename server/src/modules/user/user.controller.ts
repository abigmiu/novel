import { Body, Controller, Get, Inject,  Post, Put  } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import SWAGGER_TAGS from 'src/constant/swagger/tags';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

import { ChangeOldEmailDto, UpdateEmailDto } from './dto/changeEmail.dto';
import { PublicApi } from 'src/decorator/public.decorator';
import { UserId } from 'src/decorator/auth.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags(SWAGGER_TAGS.USER)
@ApiBearerAuth()
@Controller('user')
export class UserController {
    @Inject()
    private userService: UserService;

    @ApiOperation({ summary: '获取用户详情' })
    @Get('detail')
    findUser(@UserId() userId: number,) {
        return this.userService.getUser(userId);
    }

    @ApiOperation({ summary: '登录', description: '普通用户登录' })
    @PublicApi()
    @Post('login')
    login(@Body() data: LoginDto) {
        return this.userService.login(data);
    }

    @ApiOperation({ summary: '创建用户' })
    @PublicApi()
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({ summary: '更新用户资料' })
    @Put()
    updateUser(@UserId() userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(userId, updateUserDto);
    }

    @ApiOperation({ summary: '更换邮箱 - 旧邮箱申请更换' })
    @Post('change-email')
    changeEmail(@Body() body: ChangeOldEmailDto) {
        
    }

    @ApiOperation({ summary: '更换邮箱 - 确认新邮箱' })
    @Put('update-email')
    updateEmail(@Body() body: UpdateEmailDto) {
        
    }
}