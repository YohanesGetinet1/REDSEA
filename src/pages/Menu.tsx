import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../data/menuItems';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div>
      <PageHero
        title="Our Menu"
        subtitle="Discover our delicious selection of food and drinks"
        bgImage="https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Explore Our Menu"
            subtitle="From signature cocktails to gourmet cuisine"
            center={true}
          />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <MenuCard key={item.id} item={item} featured={item.featured} />
            ))}
          </div>
          
          {/* PDF Menu Download */}
          <div className="mt-16 text-center">
            <p className="text-gray-700 mb-4">
              Want to see our complete menu? Download our PDF menu below.
            </p>
            <button
              className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
              onClick={() => alert('In a real implementation, this would download a PDF menu.')}
            >
              Download Full Menu (PDF)
            </button>
          </div>
        </div>
      </section>
      
      {/* Special Dietary Options */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Special Dietary Options"
            subtitle="We cater to various dietary preferences"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-red-600">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vegetarian</h3>
              <p className="text-gray-700">
                We offer a variety of vegetarian options, from appetizers to main courses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-red-600">🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gluten-Free</h3>
              <p className="text-gray-700">
                Many of our dishes can be prepared gluten-free. Just ask your server.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-red-600">🥗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vegan</h3>
              <p className="text-gray-700">
                Several vegan options available. Our chef is happy to accommodate your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Orders */}
      <section className="py-16 bg-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Requests?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Our chef is happy to accommodate special dietary needs or preferences. 
            Just let your server know, and we'll do our best to create something perfect for you.
          </p>
          <button
            className="bg-white text-red-800 hover:bg-gray-100 py-3 px-6 rounded-md transition-colors duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us for Special Orders
          </button>
        </div>
      </section>
    </div>
  );
};

export default Menu;