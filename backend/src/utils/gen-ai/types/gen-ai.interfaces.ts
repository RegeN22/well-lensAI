export interface IRateItemResponse {
  name: string;
  rate: number;
  text: string;
}

export interface IRateProductResponse extends IRateItemResponse {
  ingredients: IRateItemResponse[];
}
