import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EXCEPTION_USER_NOT_FOUND, EXCEPTION_USER_PASSWORD_ERROR } from 'src/constant/exception/user';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { UserTokenDetailDto } from './dto/userDetail.dto';


@Injectable()
export class UserService {
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>;

    @Inject()
    authService: AuthService

    async login(data: LoginDto) {
        const { email, password } = data;
        const foundUser = await this.userRepo.findOne({
            where: {
                email,
            }
        })

        if (!foundUser) {
            throw new BadRequestException(EXCEPTION_USER_NOT_FOUND);
        }

        const isSamePassword = this.authService.comparePassword(password, foundUser.password);
        if (!isSamePassword) {
            throw new BadRequestException(EXCEPTION_USER_PASSWORD_ERROR)
        }

        const accessToken = this.authService.getAccessToken({ userId: foundUser.id });
        const refreshToken = this.authService.getRefreshToken({ userId: foundUser.id })

        return new UserTokenDetailDto({
            ...foundUser,
            accessToken,
            refreshToken,
        });
    }

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
        user.password = this.authService.encryptPassword(password);

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