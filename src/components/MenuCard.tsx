import React from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  featured?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, featured = false }) => {
  return (
    <div 
      className={`
        bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
        ${featured ? 'border-2 border-red-500' : ''}
      `}
    >
      {item.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
            {item.price}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{item.description}</p>
        {featured && (
          <div className="mt-3">
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full uppercase">
              Featured
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;