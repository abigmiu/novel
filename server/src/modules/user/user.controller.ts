import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import SWAGGER_TAGS from "src/constant/swagger/tags";
import { CreateUserDto } from "./dto/createUser.dto";

@ApiTags(SWAGGER_TAGS.user)
@Controller('user')
export class UserController {
    @ApiOperation({ summary: '获取用户详情' })
    @Get(':id')
    findUser() {
        console.log('获取用户详情')
    }

    @ApiOperation({ summary: '创建用户' })
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
    }
}