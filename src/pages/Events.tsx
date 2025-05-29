import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import { events } from '../data/events';

const Events: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const regularEvents = events.filter(event => event.recurring);
  const specialEvents = events.filter(event => !event.recurring);
  
  const displayedEvents = filter === 'all' 
    ? events 
    : filter === 'regular' 
      ? regularEvents 
      : specialEvents;

  return (
    <div>
      <PageHero
        title="Events & Entertainment"
        subtitle="Join us for special nights and live performances"
        bgImage="https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Experience the best entertainment in town"
            center={true}
          />
          
          {/* Event Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('regular')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'regular'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Weekly Events
            </button>
            <button
              onClick={() => setFilter('special')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'special'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Special Events
            </button>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Weekly Schedule */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Weekly Schedule"
            subtitle="Something exciting every day of the week"
            center={true}
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
              const dayEvent = events.find(event => event.recurring && event.recurringDay === day);
              
              return (
                <div key={day} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">{day}</h3>
                  {dayEvent ? (
                    <>
                      <p className="font-medium mb-1">{dayEvent.title}</p>
                      <p className="text-sm text-gray-400 mb-2">{dayEvent.time}</p>
                      <p className="text-sm line-clamp-3">{dayEvent.description}</p>
                    </>
                  ) : (
                    <p className="text-gray-400">No regular event</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Private Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle
                title="Host Your Private Event"
                subtitle="Make your celebration memorable"
              />
              <p className="text-gray-700 mb-4">
                Red Sea Lounge is the perfect venue for your private events. Whether you're planning a birthday party, corporate event, or social gathering, we can create a custom experience tailored to your needs.
              </p>
              <p className="text-gray-700 mb-6">
                Our event planning team will work with you to design a menu, arrange entertainment, and create the perfect atmosphere for your special occasion.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Custom food and drink packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Private or semi-private spaces available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Audio-visual equipment available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Entertainment options</span>
                </li>
              </ul>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Inquire About Private Events
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/5490403/pexels-photo-5490403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Private event setup"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Party celebration"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1154189/pexels-photo-1154189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Corporate event"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Catering setup"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;