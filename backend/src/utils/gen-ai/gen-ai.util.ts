import {
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import { IPersonalInfo } from '../../user/types/user.interfaces';
import { isUndefined, parseArrayJSON, parseObjectJSON } from '../general.util';
import {
  GEN_AI_MODEL,
  ingredientsString,
  rateItems,
  ratingFormat,
  totalRateCalc,
} from './types/gen-ai.consts';
import { IRateProductResponse } from './types/gen-ai.interfaces';

dotenv.config();

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEN_AI_KEY,
);
const model: GenerativeModel = genAI.getGenerativeModel({
  model: GEN_AI_MODEL,
});

/**
 * Retrieves a list of ingredients from an image file.
 * @param file - The image file to process.
 * @returns A promise that resolves to an array of strings representing the ingredients.
 */
async function getIngredientsFromImage(
  file: Express.Multer.File,
): Promise<string[]> {
  try {
    const result: GenerateContentResult = await model.generateContent([
      buildGetIngredientsPrompt(),
      {
        inlineData: {
          data: file.buffer.toString('base64'),
          mimeType: file.mimetype,
        },
      },
    ]);

    const ingredients: string[] = parseArrayJSON(result.response.text());
    return processIngredients(ingredients);
  } catch (error) {
    console.warn(`Error getting ingredients from image:\n${error}`);
    return [];
  }
}

/**
 * Processes the ingredients list by removing empty strings and duplicates.
 * @param ingredients - The ingredients list to process.
 * @returns An array of strings representing the processed ingredients.
 */
function processIngredients(ingredients: string[]): string[] {
  const result: string[] = [];

  for (const ingredient of ingredients) {
    if (ingredient) {
      // const closeSplits: string[] = ingredient.split(')');
      // for (const closeSplit of closeSplits) {
      //   const openSplits: string[] = closeSplit.split('(');
      //   const comaSplits: string[] = openSplits[0].split(',');

      //   if (comaSplits.length > 1) {
      //     result.push(...comaSplits.slice(0, -1).map((item) => item.trim()));

      //   }
      // }

      result.push(ingredient);
    }
  }

  return result;
}

/**
 * Builds a prompt for getting a list of ingredients as a JSON array.
 * @returns A string representing the prompt for getting a list of ingredients.
 */
function buildGetIngredientsPrompt(): string {
  return `
Find a text list of ingredients from the picture, FILTER NON-INGREDIENTS items. return the list as a JSON array
otherwise return an empty array.
  `;
}

/**
 * Rates a product based on the given ingredients and personal information.
 * @param file - The image file of the product.
 * @param ingredients - An array of strings representing the ingredients of the product.
 * @param personalInfo - Optional personal information about the user.
 * @returns A promise that resolves to an object representing the response of the rating process.
 */
async function rateProduct(
  file: Express.Multer.File,
  ingredients: string[],
  personalInfo?: IPersonalInfo,
): Promise<IRateProductResponse> {
  const prompt: string = buildRateProductPrompt(ingredients, personalInfo);

  const result: GenerateContentResult = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: file.buffer.toString('base64'),
        mimeType: file.mimetype,
      },
    },
  ]);

  const response: IRateProductResponse = parseObjectJSON(
    result.response.text(),
  );
  response.id = uuid.v4();

  for (const ingredient of response.ingredients) {
    ingredient.id = uuid.v4();
  }

  return response;
}

/**
 * Builds a prompt for determining if a product is healthy for a person or not.
 *
 * @param ingredients - An array of strings representing the product's ingredients.
 * @param personalInfo - Optional personal information about the person.
 * @returns A string representing the generated prompt.
 */
function buildRateProductPrompt(
  ingredients: string[],
  personalInfo?: IPersonalInfo,
): string {
  const prompt: string = `
${buildPersonalInfoPrompt(personalInfo)}
${ingredientsString(ingredients)}
${rateItems()}
${totalRateCalc()}
${ratingFormat}
`;

  return prompt;
}

/**
 * Builds a prompt string based on the provided personal information.
 * @param personalInfo - The personal information object.
 * @returns The generated prompt string.
 */
function buildPersonalInfoPrompt(personalInfo?: IPersonalInfo): string {
  if (!validatePersonalInfo(personalInfo)) {
    return 'Determine if a product is healthy for a person or not according to this list.';
  }

  let result: string =
    'Determine if a product is healthy for this specific person or not according to this list.';
  result += '\nPAY ATTENTION to the health background of the person:';

  result += buildValuePropPrompt('Age', personalInfo.age, 'years old');
  result += buildValuePropPrompt('Gender', personalInfo.gender);
  result += buildValuePropPrompt('Weight', personalInfo.weight, 'kg');
  result += buildValuePropPrompt('Height', personalInfo.height, 'cm');
  result += buildArrayPropPrompt('Allergies', personalInfo.allergies);
  result += buildArrayPropPrompt('Deceases', personalInfo.deceases);

  return result;
}

/**
 * Validates the personal information object.
 *
 * @param personalInfo - The personal information object to validate.
 * @returns A boolean indicating whether the personal information is valid or not.
 */
function validatePersonalInfo(personalInfo?: IPersonalInfo): boolean {
  if (!personalInfo) return false;
  return (
    !!personalInfo?.age ||
    !!personalInfo?.gender ||
    !!personalInfo?.weight ||
    !!personalInfo?.height ||
    !!personalInfo?.allergies?.length ||
    !!personalInfo?.deceases?.length
  );
}

/**
 * Builds a value proposition prompt by combining a label and a value.
 *
 * @param label - The label for the value proposition.
 * @param value - The value for the value proposition.
 * @param unit - The unit for the value.
 * @returns The value proposition prompt.
 */
function buildValuePropPrompt(
  label: string,
  value?: string | number,
  unit?: string,
): string {
  if (isUndefined(value)) return '';

  return `\n${label}: ${value} ${unit ?? ''}`;
}

/**
 * Builds a prompt string for an array property.
 *
 * @param label - The label for the property.
 * @param items - An optional array of items.
 * @param unit - An optional unit for the items.
 * @returns The prompt string.
 */
function buildArrayPropPrompt(
  label: string,
  items?: string[],
  unit?: string,
): string {
  if (!items?.length) return '';

  return `\n${label}: ${items.join(`${unit ?? ''}, `)}`;
}

const GenAI = { getIngredientsFromImage, rateProduct };
export default GenAI;
