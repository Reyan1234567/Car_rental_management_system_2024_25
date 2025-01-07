import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Authentication } from './authentication.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Authentication') private authModel: Model<Authentication>,
  ) {}

  async createUser(userData: { userID: string; password: string; role?: string }) {
    const existingUser = await this.authModel.findOne({ userID: userData.userID });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new this.authModel({
      ...userData,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(userCredentials: { userID: string; password: string }) {
    const { userID, password } = userCredentials;
    const user = await this.authModel.findOne({ userID });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, userID: user.userID, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}