import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { DailySpecial } from '../types';

interface DailySpecialsSliderProps {
  specials: DailySpecial[];
}

const DailySpecialsSlider: React.FC<DailySpecialsSliderProps> = ({ specials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Get the current day index (0 = Sunday, 1 = Monday, etc.)
  const getCurrentDayIndex = () => {
    const day = new Date().getDay();
    // Convert to our format (0 = Monday, 1 = Tuesday, etc.)
    return day === 0 ? 6 : day - 1;
  };

  // Set the initial active index to the current day
  useEffect(() => {
    setActiveIndex(getCurrentDayIndex());
  }, []);

  const goToSpecial = (index: number) => {
    setActiveIndex(index);
  };

  // Get the days of the week
  const getDayName = (index: number) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[index];
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 overflow-hidden">
      <div className="flex mb-4 overflow-x-auto scrollbar-hide">
        {specials.map((special, index) => (
          <button
            key={special.docId || special.day}
            onClick={() => goToSpecial(index)}
            className={`px-4 py-2 rounded-full mx-1 whitespace-nowrap transition-colors duration-300 ${
              activeIndex === index
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {special.day}
          </button>
        ))}
      </div>

      <div className="relative h-full w-full">
        {specials.map((special, index) => (
          <div
            key={special.docId || special.day}
            className={`transform transition-all duration-500 ${
              activeIndex === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 absolute top-0 translate-x-full'
            }`}
          >
            <div className="flex items-center text-red-400 mb-2">
              <Calendar size={18} className="mr-2" />
              <span>{special.day}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{special.title}</h3>
            <p className="text-gray-300 mb-4">{special.description}</p>
            <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full">
              {special.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySpecialsSlider;