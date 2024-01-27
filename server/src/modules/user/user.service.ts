import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EXCEPTION_USER_NOT_FOUND } from 'src/constant/exception/user';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>;

    @Inject()
    authService: AuthService

    async getUser(userId: number) {
        const foundUser = await this.userRepo.findOne({
            where: { 
                id: userId,
            }
        })
        
        if (!foundUser) {
            throw new BadRequestException(EXCEPTION_USER_NOT_FOUND);
        }
        return foundUser;
    }

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
        
        const accessToken = this.authService.getAccessToken({ userId: res.id });
        const refreshToken = this.authService.getRefreshToken({ userId: res.id })

        return {
            ...res,
            accessToken,
            refreshToken,
        };
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const foundUser = await this.userRepo.findOne({
            where: {
                id,
            },
        });

        if (!foundUser) {
            throw new BadRequestException(EXCEPTION_USER_NOT_FOUND);
        }
        const { nickname, avatar } = updateUserDto;
        if (nickname) {
            foundUser.nickname = nickname;
        }
        if (avatar) {
            foundUser.avatar = avatar;
        }

        await this.userRepo.save(foundUser);
    }
}