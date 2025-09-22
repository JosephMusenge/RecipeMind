import { GroceryItem, Recipe } from '../types';

export const mockGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Tomatoes', category: 'Produce' },
  { id: '2', name: 'Chicken Breast', category: 'Meat' },
  { id: '3', name: 'Pasta', category: 'Pantry' },
  { id: '4', name: 'Mozzarella', category: 'Dairy' },
  { id: '5', name: 'Basil', category: 'Produce' },
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Chicken Caprese Pasta',
    ingredients: ['Chicken Breast', 'Pasta', 'Tomatoes', 'Mozzarella', 'Basil'],
    instructions: [
      'Cook pasta according to package directions',
      'Season and cook chicken breast until done',
      'Combine with fresh tomatoes, mozzarella, and basil',
      'Toss everything together and serve hot'
    ],
    cookingTime: '25 min',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Margherita Pasta',
    ingredients: ['Pasta', 'Tomatoes', 'Mozzarella', 'Basil'],
    instructions: [
      'Cook pasta until al dente',
      'Dice fresh tomatoes and mozzarella',
      'Toss hot pasta with tomatoes and cheese',
      'Garnish with fresh basil leaves'
    ],
    cookingTime: '15 min',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Herb Chicken',
    ingredients: ['Chicken Breast', 'Basil'],
    instructions: [
      'Season chicken with herbs and salt',
      'Cook in a hot pan for 6-7 minutes per side',
      'Let rest for 5 minutes before serving',
      'Garnish with fresh basil'
    ],
    cookingTime: '20 min',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Tomato Basil Salad',
    ingredients: ['Tomatoes', 'Basil', 'Mozzarella'],
    instructions: [
      'Slice tomatoes and mozzarella',
      'Arrange alternating on a plate',
      'Top with fresh basil leaves',
      'Drizzle with olive oil and season'
    ],
    cookingTime: '5 min',
    image: 'https://images.pexels.com/photos/6646627/pexels-photo-6646627.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Simple Pasta',
    ingredients: ['Pasta', 'Tomatoes'],
    instructions: [
      'Cook pasta according to package directions',
      'Dice fresh tomatoes',
      'Toss hot pasta with tomatoes',
      'Season with salt and pepper'
    ],
    cookingTime: '12 min',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];