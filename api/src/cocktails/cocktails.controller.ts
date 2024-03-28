import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UploadedFile,
  UseGuards,
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

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.cocktailModel.findById(id);
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

  @UseGuards(TokenAuthGuard, PermitAuthGuard)
  @SetMetadata('roles', 'admin')
  @Delete(':id')
  deleteCocktail(@Param('id') id: string) {
    return this.cocktailModel.findByIdAndDelete(id);
  }
}
