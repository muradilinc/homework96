import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { CocktailsController } from './cocktails/cocktails.controller';
import { Cocktail, CocktailSchema } from './schemas/cocktails.schema';
import { TokenAuthGuard } from './auth/token-auth.guard';
import { PermitAuthGuard } from './auth/permit-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { GoogleController } from './google/google.controller';
import { SeedsService } from './seeds/seeds.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/cocktail'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Cocktail.name, schema: CocktailSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    UsersController,
    CocktailsController,
    GoogleController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    TokenAuthGuard,
    PermitAuthGuard,
    SeedsService,
  ],
})
export class AppModule {}
