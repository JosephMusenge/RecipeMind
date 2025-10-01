import React, { useEffect, useState } from 'react';
import { ShoppingCart, ChefHat } from 'lucide-react';
import GroceryList from './components/GroceryList';
import RecipePanel from './components/RecipePanel';
import { mockGroceryItems, mockRecipes } from './data/mockData';
import { GroceryItem, Recipe } from './types';

const App = () => {
  const [activeTab, setActiveTab] = useState<'grocery' | 'recipes'>('grocery');
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // function to fetch recipes from backend 
  useEffect(() => {
    const fetchRecipes = async () => {
      if (groceryItems.length === 0) {
        setRecipes([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groceryList: groceryItems.map(item => item.name) }),
        });

          const data = await response.json();
          setRecipes(data.recipes);
        } catch (error) {
          console.error('Error fetching recipes:', error);
          setRecipes([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    }, [groceryItems]);
      

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">RecipeMind: A Smart Shopping & Recipe Recommender</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('grocery')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'grocery'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Shopping List</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recipes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ChefHat className="w-4 h-4" />
                <span>Recommendations</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'grocery' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <GroceryList items={groceryItems} onItemsChange={setGroceryItems} />
            </div>
            <div className="lg:sticky lg:top-8 lg:self-start">
              <RecipePanel groceryItems={groceryItems} recipes={recipes} loading={loading} />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <RecipePanel groceryItems={groceryItems} recipes={recipes} loading={loading}/>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;