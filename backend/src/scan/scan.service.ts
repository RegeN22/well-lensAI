import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { IPersonalInfo } from '../user/types/user.interfaces';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import GenAI from '../utils/gen-ai/gen-ai.util';
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';
import { uniqueItems } from '../utils/general.util';

@Injectable()
export class ScanService {
  constructor(
    private userService: UserService,
    private historyService: HistoryService,
  ) {}

  /**
   * Scans a product by extracting ingredients from an image file and rating the product.
   * @param file - The image file to scan.
   * @param personalInfo - The personal information of the user.
   * @returns A promise that resolves to an object containing the rated product information.
   * @throws HttpException if no ingredients are found in the image.
   */
  async scanProduct(
    file: Express.Multer.File,
    personalInfo?: IPersonalInfo,
  ): Promise<IRateProductResponse> {
    console.info('Got request to scan product');
    const ingredients: string[] = await this.getIngredientsFromImage(file);

    const result: IRateProductResponse = await GenAI.rateProduct(
      file,
      ingredients,
      personalInfo,
    );
    result.name ??= 'unknown';

    console.info(`Product '${result.name}' scanned successfully`);
    return result;
  }

  /**
   * Retrieves ingredients from an image file.
   *
   * @param file - The image file to extract ingredients from.
   * @returns A promise that resolves to an array of ingredients found in the image.
   * @throws HttpException if no ingredients are found in the image.
   */
  private async getIngredientsFromImage(
    file: Express.Multer.File,
  ): Promise<string[]> {
    const fetchIngredients: string[][] = await Promise.all([
      GenAI.getIngredientsFromImage(file),
      GenAI.getIngredientsFromImage(file),
      GenAI.getIngredientsFromImage(file),
    ]);

    const ingredients: string[] = uniqueItems(...fetchIngredients);

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

    return ingredients;
  }

  /**
   * Scans a product for a user.
   *
   * @param userId - The ID of the user.
   * @param file - The file to be scanned.
   * @returns A promise that resolves to an object representing the result of the product scan.
   */
  async scanProductForUser(
    userId: string,
    file: Express.Multer.File,
  ): Promise<IRateProductResponse> {
    console.info(`Got request to scan product for user '${userId}'`);

    const user: User = await this.userService.findById(userId);

    const result: IRateProductResponse = await this.scanProduct(file, user);

    await this.historyService.create({
      userId,
      image: file,
      jsonData: result,
    });

    console.info(`Product '${result.name}' scanned successfully`);
    return result;
  }
}
