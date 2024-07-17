import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import GenAI from '../utils/gen-ai/gen-ai.util';
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';

@Injectable()
export class ScanService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Scans a product by extracting ingredients from an image file and rating the product.
   * @param file - The image file to scan.
   * @returns A promise that resolves to an object containing the rated product information.
   * @throws HttpException if no ingredients are found in the image.
   */
  async scanProduct(file: Express.Multer.File): Promise<IRateProductResponse> {
    console.info('Got request to scan product');
    const ingredients: string[] = await GenAI.getIngredientsFromImage(file);

    if (ingredients?.length) {
      console.debug(
        `Ingredients found in image: ${JSON.stringify(ingredients)}`,
      );
    } else {
      console.error('No ingredients found in image');
      throw new HttpException(
        'No ingredients found in image',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result: IRateProductResponse = await GenAI.rateProduct(
      file,
      ingredients,
      {
        age: 23,
        height: 180,
        gender: 'Male',
        weight: 82,
        allergies: ['Milk'],
        deceases: ['Diabetes', 'Hypertension'],
      },
    );

    console.info(`Product  scanned successfully`);
    return result;
  }

  async scanProductForUser(
    userId: number,
    file: Express.Multer.File,
  ): Promise<IRateProductResponse> {
    return null;
  }
}
