import React from 'react';
import { Clock, ChefHat } from 'lucide-react';
import { Recipe, GroceryItem } from '../types';

interface RecipePanelProps {
  groceryItems: GroceryItem[];
  recipes: Recipe[];
}

export default function RecipePanel({ groceryItems, recipes }: RecipePanelProps) {
  const availableIngredients = groceryItems.map(item => item.name.toLowerCase());
  
  const getMatchingRecipes = () => {
    if (availableIngredients.length === 0) return [];
    
    return recipes
      .map(recipe => {
        const matchingIngredients = recipe.ingredients.filter(ingredient =>
          availableIngredients.some(available => 
            ingredient.toLowerCase().includes(available) || 
            available.includes(ingredient.toLowerCase())
          )
        );
        
        return {
          ...recipe,
          matchCount: matchingIngredients.length,
          matchPercentage: Math.round((matchingIngredients.length / recipe.ingredients.length) * 100)
        };
      })
      .filter(recipe => recipe.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 3);
  };

  const matchingRecipes = getMatchingRecipes();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <ChefHat className="w-5 h-5 mr-2 text-green-600" />
          Recipe Suggestions
        </h2>
        <p className="text-gray-600 mb-6">Here's what you can make with what you currently have</p>
        
        {matchingRecipes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ChefHat className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recipes available yet</p>
            <p className="text-sm">Add some grocery items to see what you can cook!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matchingRecipes.map((recipe) => (
              <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{recipe.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 ml-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookingTime}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Ingredients:</span> {recipe.ingredients.join(', ')}
                      </p>
                      <div className="text-xs text-green-600 font-medium">
                        {recipe.matchPercentage}% match with your items
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">Quick Instructions:</p>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {recipe.instructions.slice(0, 2).map((instruction, index) => (
                          <li key={index} className="flex">
                            <span className="text-gray-400 mr-2">{index + 1}.</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                        {recipe.instructions.length > 2 && (
                          <li className="text-gray-400 text-xs">
                            +{recipe.instructions.length - 2} more steps...
                          </li>
                        )}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}