/**
 * Parses a JSON string and returns the parsed object.
 * @param json - The JSON string to parse.
 * @returns The parsed object, or null if parsing fails.
 * @template T - The type of the parsed object. Defaults to any.
 */
export function parseJSON<T = any>(json: string): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

/**
 * Parses a JSON string and returns the parsed object.
 *
 * @template T - The type of the object to parse.
 * @param {string} json - The JSON string to parse.
 * @returns {T} - The parsed object.
 */
export function parseObjectJSON<T = any>(json: string): T {
  const toParse: string = json
    .split('{')
    .slice(1)
    .join('{')
    .split('}')
    .slice(0, -1)
    .join('}');

  return parseJSON(`{${toParse}}`);
}

/**
 * Parses a JSON string representing an array and returns the parsed array.
 *
 * @template T - The type of the elements in the array.
 * @param {string} json - The JSON string to parse.
 * @returns {T} - The parsed array.
 */
export function parseArrayJSON<T = any>(json: string): T {
  const toParse: string = json
    .split('[')
    .slice(1)
    .join('[')
    .split(']')
    .slice(0, -1)
    .join(']');

  return parseJSON(`[${toParse}]`);
}

/**
 * Checks if a value is undefined or null.
 *
 * @param value - The value to check.
 * @returns True if the value is undefined or null, false otherwise.
 */
export function isUndefined(value: any): boolean {
  return value === undefined || value === null;
}

/**
 * Returns an array of unique items from multiple arrays.
 *
 * @param arrays The arrays to merge and extract unique items from.
 * @returns An array of unique items.
 */
export function uniqueItems<T = any>(...arrays: T[][]): T[] {
  return [
    ...new Set(
      (arrays ?? [])
        .reduce((result: T[], items: T[]) => {
          return [...result, ...(items ?? [])];
        }, [])
        .filter(Boolean),
    ),
  ];
}
