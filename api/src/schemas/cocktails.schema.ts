import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './users.schema';

@Schema()
export class Cocktail {
  @Prop({ required: true, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  recipe: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  image: string;

  @Prop({ required: true })
  ingredients: [
    {
      name: string;
      count: string;
    },
  ];
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
export type CocktailDocument = Cocktail & Document;
