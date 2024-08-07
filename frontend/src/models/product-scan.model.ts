export interface ProductScanModel extends ProductIngredientModel {
  ingredients: ProductIngredientModel[];
}

export interface ProductIngredientModel {
  _id: string;
  name: string;
  rate: number;
  text: string;
}

export interface ProductFromHistoryModel {
  _id: string;
  __v: string; //wtf
  userId: string;
  image: ImageType;
  jsonData: ProductScanModel;
}

export interface HistoryProductModel {
  image: string;
  jsonData:ProductScanModel;
}

export interface ImageType {
  fieldname:string
  originalname:string
  encoding:string
  mimetype:string
  buffer:string
  size:number
}