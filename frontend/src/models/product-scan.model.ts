export interface ProductScanModel {
  name: string;
  rate: number;
  text: string;
  ingredients: ProductIngredientModel[];
}

export interface ProductIngredientModel {
  name: string;
  rate: number;
  text: string;
}