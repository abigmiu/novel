import { Body, Controller, Get, Inject, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import SWAGGER_TAGS from 'src/constant/swagger/tags';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags(SWAGGER_TAGS.user)
@Controller('user')
export class UserController {
    @Inject()
    private userService: UserService;

    @ApiOperation({ summary: '获取用户详情' })
    @Get(':id')
    findUser() {
        console.log('获取用户详情');
    }

    @ApiOperation({ summary: '创建用户' })
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({ summary: '更新用户资料' })
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(Number(id), updateUserDto)
    }
}