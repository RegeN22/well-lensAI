export interface ProductScanModel extends ProductIngredientModel {
  ingredients: ProductIngredientModel[];
}

export interface ProductIngredientModel {
  _id: string;
  name: string;
  rate: number;
  text: string;
}
