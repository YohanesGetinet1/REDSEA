// src/pages/Menu.tsx
import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import { MenuItem } from '../types';
import { fetchMenuItems } from '../services/firestoreService';
import toast from 'react-hot-toast';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
  ];

  // This useEffect will re-run whenever the activeCategory changes.
  useEffect(() => {
    const getMenuItems = async () => {
      setLoading(true);
      try {
        // We pass the activeCategory to our fetching function.
        // The function will handle the 'all' case by not applying a category filter.
        const items = await fetchMenuItems({ category: activeCategory });
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items for category:", activeCategory, error);
        toast.error("Could not load menu items.");
      } finally {
        setLoading(false);
      }
    };

    getMenuItems();
  }, [activeCategory]); // Dependency array includes activeCategory

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
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading menu...</p>
              {/* Optional: Add a spinner component here */}
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map(item => (
                <MenuCard key={item.docId} item={item} featured={item.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">No items found in this category.</p>
            </div>
          )}
          
          {/* PDF Menu Download ... (remains the same) ... */}
          <div className="mt-16 text-center">
            {/* ... */}
          </div>
        </div>
      </section>
      
      {/* Special Dietary Options ... (remains static for now) ... */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            {/* ... */}
        </div>
      </section>
      
      {/* Custom Orders ... (remains static for now) ... */}
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