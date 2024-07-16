import {
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { IPersonalInfo } from '../../user/types/user.interfaces';
import { isUndefined, parseArrayJSON, parseJSON } from '../general.util';
import { DEFAULT_SCALE, GEN_AI_MODEL } from './types/gen-ai.consts';
import { IRateProductResponse } from './types/gen-ai.interfaces';

require('dotenv').config();

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
  const result: GenerateContentResult = await model.generateContent([
    buildGetIngredientsPrompt(),
    {
      inlineData: {
        data: file.buffer.toString('base64'),
        mimeType: file.mimetype,
      },
    },
  ]);

  return parseArrayJSON(result.response.text());
}

/**
 * Builds a prompt for getting a list of ingredients as a JSON array.
 * @returns A string representing the prompt for getting a list of ingredients.
 */
function buildGetIngredientsPrompt(): string {
  return `
    Find a text list of ingredients the picture, return the list as a JSON array
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

  return parseJSON(result.response.text());
}

/**
 * Builds a prompt for determining if a product is healthy for a person or not.
 *
 * @param ingredients - An array of strings representing the product's ingredients.
 * @param personalInfo - Optional personal information about the person.
 * @param scale - The scale to use for rating the product.
 * @returns A string representing the generated prompt.
 */
function buildRateProductPrompt(
  ingredients: string[],
  personalInfo?: IPersonalInfo,
  scale: string = DEFAULT_SCALE,
): string {
  const ingredientsString: string = `The product\'s ingredients are:\n${ingredients.map((item) => `- ${item}`).join('\n')}\n`;
  const rateItems: string = `Rate each ingredient on a ${scale} scale based on nutritional value and health pros and cons.`;
  const totalRateCalc: string = `
    Give the final rating of the product based on on a ${scale} scale
    If at least one of the ingredients has 0 rating, THE FINAL RATING IS 0!
  `;
  const ratingFormat: string = `Return the result in the following format:
    {
      name: string;
      rate: number;
      text: string;
      ingredients: [
      {
        name: string;
        rate: number;
        text: string;
      }
      ...
      ]
    }
  `;

  const prompt: string = `
    Determine if a product is healthy for a person or not according to this list.
    ${ingredientsString}
    ${rateItems}
    ${totalRateCalc}
    ${buildPersonalInfoPrompt(personalInfo)}
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
  if (!validatePersonalInfo(personalInfo)) return '';

  let result = 'PAY ATTENTION to the health background of the person:';

  result += buildValuePropPrompt('Age', personalInfo.age);
  result += buildValuePropPrompt('Gender', personalInfo.gender);
  result += buildValuePropPrompt('Weight', personalInfo.weight);
  result += buildValuePropPrompt('Height', personalInfo.height);
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
 * @returns The value proposition prompt.
 */
function buildValuePropPrompt(label: string, value?: string | number): string {
  if (isUndefined(value)) return '';

  return `\n${label}: ${value}`;
}

/**
 * Builds a prompt string for an array property.
 *
 * @param label - The label for the property.
 * @param items - An optional array of items.
 * @returns The prompt string.
 */
function buildArrayPropPrompt(label: string, items?: string[]): string {
  if (!items?.length) return '';

  return `\n${label}: ${items.join(', ')}`;
}

const GenAI = { getIngredientsFromImage, rateProduct };
export default GenAI;
