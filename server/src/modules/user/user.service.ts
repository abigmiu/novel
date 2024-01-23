import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>;

    async createUser(createUserDto: CreateUserDto) {
        const user = new UserEntity();
        const {
            avatar,
            nickname,
            email,
            password,
        } = createUserDto;
        user.avatar = avatar;
        user.nickname = nickname;
        user.email = email;
        user.password = password;

        const res = await this.userRepo.save(user);
        return res;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const foundUser = await this.userRepo.findOne({
            where: {
                id,
            },
        });

        if (!foundUser) {
            throw new BadRequestException('用户不存在');
        }
        const { nickname } = updateUserDto;
        if (nickname) {
            foundUser.nickname = nickname;
        }

        await this.userRepo.save(foundUser);
    }
}