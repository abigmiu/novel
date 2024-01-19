import { Body, Controller, Get, Inject, Post, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import SWAGGER_TAGS from "src/constant/swagger/tags";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@ApiTags(SWAGGER_TAGS.user)
@Controller('user')
export class UserController {
    @Inject()
    private userService: UserService

    @ApiOperation({ summary: '获取用户详情' })
    @Get(':id')
    findUser() {
        console.log('获取用户详情')
    }

    @ApiOperation({ summary: '创建用户' })
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}