export const GEN_AI_MODEL = 'gemini-1.5-flash';

export const DEFAULT_SCALE = '0-10';

export const ingredientsString = (ingredients: string[]): string => {
  return `The product\'s ingredients are:\n${ingredients.map((item) => `- ${item}`).join('\n')}\n`;
};

export const rateItems = (scale = DEFAULT_SCALE): string => {
  return `Rate each ingredient on a ${scale} scale based health pros and cons.`;
};

// export const rateItems = (scale = DEFAULT_SCALE): string => {
//   return `Rate each ingredient on a ${scale} scale based on nutritional value and health pros and cons. write no more than one sentence for each ingredient.`;
// };

export const totalRateCalc: (scale?: string) => string = (
  scale = DEFAULT_SCALE,
): string => {
  return `
Give the final rating of the product based on on a ${scale} scale
If at least one of the ingredients rating is 0, THE FINAL RATING IS 0!
Write a summary of the product's health benefits and cons.
`;
};

export const ratingFormat: string = `
Return the result in the following format:
{
    "name": string;
    "rate": number;
    "text": string;
    "ingredients": [
    {
    "name": string;
    "rate": number;
    }
    ...
    ]
}.
Don't add anything incuding type assertion. The response must be a valid json.
`;

export const GEN_AI_KEY = "AIzaSyBzfw8a69jWdmLa46WdBesTLQzaEOQnmAw"