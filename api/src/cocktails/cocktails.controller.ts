import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cocktail, CocktailDocument } from '../schemas/cocktails.schema';
import mongoose, { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { CreateCocktailDto } from './create-cocktail.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { PermitAuthGuard } from '../auth/permit-auth.guard';

@Controller('cocktails')
export class CocktailsController {
  constructor(
    @InjectModel(Cocktail.name) private cocktailModel: Model<CocktailDocument>,
  ) {}

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/cocktails',
        filename(
          _req: express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename = randomUUID();
          callback(null, filename + '' + extname(file.originalname));
        },
      }),
    }),
  )
  async createCocktail(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCocktailDto: CreateCocktailDto,
  ) {
    try {
      const cocktail = new this.cocktailModel({
        user: createCocktailDto.user,
        title: createCocktailDto.title,
        image: file ? '/uploads/cocktails/' + file.filename : null,
        recipe: createCocktailDto.recipe,
        ingredients: JSON.parse(createCocktailDto.ingredients.toString()),
      });
      return await cocktail.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @Get()
  getAll(@Query('userId') userId: string, @Query('admin') admin: boolean) {
    if (userId) {
      return this.cocktailModel
        .find({ user: userId })
        .populate('user', 'displayName');
    } else if (admin) {
      return this.cocktailModel.find().populate('user', 'displayName');
    } else {
      return this.cocktailModel
        .find({ isPublished: true })
        .populate('user', 'displayName');
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.cocktailModel.findById(id).populate('user', 'displayName');
  }

  @UseGuards(TokenAuthGuard, PermitAuthGuard)
  @SetMetadata('roles', 'admin')
  @Patch(':id')
  changeStatus(@Param('id') id: string) {
    return this.cocktailModel.findOneAndUpdate(
      {
        _id: id,
      },
      [{ $set: { isPublished: { $eq: [false, '$isPublished'] } } }],
    );
  }

  @UseGuards(TokenAuthGuard)
  @Patch(':id/change-rating')
  async changeRating(
    @Param('id') id: string,
    @Body() ratingData: { userId: string; grade: number },
  ) {
    const { userId, grade } = ratingData;
    const cocktail = await this.cocktailModel.findById(id);

    const index = cocktail.rating.findIndex((item) => item.user === userId);
    if (index !== -1) {
      cocktail.rating[index].grade = grade;
      await cocktail.save();
    } else {
      return this.cocktailModel.findOneAndUpdate(
        { _id: id },
        { $push: { rating: { user: userId, grade } } },
        { new: true },
      );
    }

    return cocktail;
  }

  @UseGuards(TokenAuthGuard, PermitAuthGuard)
  @SetMetadata('roles', 'admin')
  @Delete(':id')
  deleteCocktail(@Param('id') id: string) {
    return this.cocktailModel.findByIdAndDelete(id);
  }
}
