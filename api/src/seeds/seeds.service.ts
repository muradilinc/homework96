import { User, UserDocument } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cocktail, CocktailDocument } from '../schemas/cocktails.schema';
import * as crypto from 'crypto';

export class SeedsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
  ) {}

  async run() {
    await this.clearDatabase();

    await this.userModel.create({
      email: 'admin@admin.com',
      password: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
      avatar: 'fixtures/users/user.avif',
      displayName: 'vito',
    });

    const [user1, user2] = await this.userModel.create([
      {
        email: 'vito@mafia.com',
        password: 'joe',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/users/user.avif',
        displayName: 'vito',
      },
      {
        email: 'muradil@muradil.com',
        password: 'muradil',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/users/user.avif',
        displayName: 'vito',
      },
    ]);

    await this.cocktailModel.create([
      {
        user: user2._id,
        title: 'Margarita',
        recipe: 'Mix tequila, triple sec, and lime juice, then serve over ice.',
        isPublished: true,
        image: 'fixtures/cocktails/cocktail.jpg',
        ingredients: [
          { name: 'Tequila', count: '2 oz' },
          { name: 'Triple sec', count: '1 oz' },
          { name: 'Lime juice', count: '1 oz' },
        ],
        rating: [],
      },
      {
        user: user1._id,
        title: 'Cosmopolitan',
        recipe:
          'Mix vodka, triple sec, cranberry juice, and lime juice, then strain into a martini glass.',
        isPublished: true,
        image: 'fixtures/cocktails/cocktail.jpg',
        ingredients: [
          { name: 'Vodka', count: '1.5 oz' },
          { name: 'Triple sec', count: '0.5 oz' },
          { name: 'Cranberry juice', count: '1 oz' },
          { name: 'Lime juice', count: '0.5 oz' },
        ],
        rating: [],
      },
    ]);
  }

  async clearDatabase() {
    await Promise.all([this.userModel.deleteMany({})]);
    await Promise.all([this.cocktailModel.deleteMany({})]);
  }
}
