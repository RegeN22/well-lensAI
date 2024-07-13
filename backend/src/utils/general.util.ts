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
 * Checks if a value is undefined or null.
 * 
 * @param value - The value to check.
 * @returns True if the value is undefined or null, false otherwise.
 */
export function isUndefined(value: any): boolean {
  return value === undefined || value === null;
}
