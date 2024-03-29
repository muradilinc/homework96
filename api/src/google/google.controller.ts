import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { GoogleAuthDto } from './google-auth.dto';
import { OAuth2Client } from 'google-auth-library';
import * as process from 'process';
import * as crypto from 'crypto';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('google')
export class GoogleController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  async googleLogin(@Body() googleToken: GoogleAuthDto) {
    const ticket = await client.verifyIdToken({
      idToken: googleToken.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return UnauthorizedException;
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return UnauthorizedException;
    }

    let user = await this.userModel.findOne({ googleID: id });
    if (!user) {
      user = new this.userModel({
        email: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    return {
      message: 'Login with google successful!',
      user,
    };
  }
}
