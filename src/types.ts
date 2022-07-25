export type IElementType = "WIDTH" | "HEIGHT";

export interface IBinding {
  id: number;
  title: string;
  price: number;
}

export interface IElement {
  id: string;
  title: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  type: IElementType;
}

export interface IShower {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  image: string | null;
  elements: IElement[];
  bindings: IBinding[];
}

export interface IGlass {
  id: string;
  name: string;
  price: number;
}