import { Body, Controller, Get, Inject, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import SWAGGER_TAGS from 'src/constant/swagger/tags';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateUserParamsDto } from './dto/updateUser.dto';
import { FindUserParamsDto } from './dto/findUser.dto';
import { ChangeOldEmailDto, UpdateEmailDto } from './dto/changeEmail.dto';

@ApiTags(SWAGGER_TAGS.user)
@Controller('user')
export class UserController {
    @Inject()
    private userService: UserService;

    @ApiOperation({ summary: '获取用户详情' })
    @Get(':userId')
    findUser(@Param() params: FindUserParamsDto) {
        return this.userService.getUser(params.userId);
    }

    @ApiOperation({ summary: '创建用户' })
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({ summary: '更新用户资料' })
    @Put(':id')
    updateUser(@Param() params: UpdateUserParamsDto, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(params.id, updateUserDto)
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