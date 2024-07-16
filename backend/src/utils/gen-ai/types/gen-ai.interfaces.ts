export interface IRateItemResponse {
  id: string;
  name: string;
  rate: number;
  text: string;
}

export interface IRateProductResponse extends IRateItemResponse {
  ingredients: IRateItemResponse[];
}
