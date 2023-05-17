export interface IItem {
  id: number;
  name: string;
  price: number;
  description: string;
  menuID: number;
  protien: number;
  fat: number;
  energy: number;
  carbs: number;
  calories: number;
  isActive: boolean;
}

export interface IItemIngredients {
  id: number;
  itemID: number;
  ingredientID: number;
}

export interface IItemImages {
  id: number;
  img: string;
  main: boolean;
  itemID: number;
}
