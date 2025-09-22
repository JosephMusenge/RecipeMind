import React, { useState } from 'react';
import { Plus, X, ShoppingCart } from 'lucide-react';
import { GroceryItem } from '../types';

interface GroceryListProps {
  items: GroceryItem[];
  onItemsChange: (items: GroceryItem[]) => void;
}

export default function GroceryList({ items, onItemsChange }: GroceryListProps) {
  const [newItemName, setNewItemName] = useState('');

  const addItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: 'Other'
    };
    
    onItemsChange([...items, newItem]);
    setNewItemName('');
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Item Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
          Add Grocery Items
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter grocery item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Grocery List ({items.length} items)
        </h3>
        
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Your grocery list is empty</p>
            <p className="text-sm">Add some items to see recipe suggestions!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{item.name}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}