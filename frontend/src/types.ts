export interface GroceryItem {
  id: string;
  name: string;
  category: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  image: string;
}