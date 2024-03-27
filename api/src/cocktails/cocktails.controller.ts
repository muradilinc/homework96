import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cocktail, CocktailDocument } from '../schemas/cocktails.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { CreateCocktailDto } from './create-cocktail.dto';

@Controller('cocktails')
export class CocktailsController {
  constructor(
    @InjectModel(Cocktail.name) private cocktailModel: Model<CocktailDocument>,
  ) {}

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
    const cocktail = new this.cocktailModel({
      user: createCocktailDto.user,
      title: createCocktailDto.title,
      image: file ? '/uploads/cocktails/' + file.filename : null,
      recipe: createCocktailDto.recipe,
      ingredients: JSON.parse(createCocktailDto.ingredients.toString()),
    });
    return await cocktail.save();
  }

  @Get()
  getAll() {
    return this.cocktailModel.find();
  }
}
