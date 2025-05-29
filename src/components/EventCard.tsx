import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar size={16} className="mr-2 text-red-500" />
          <span>
            {event.recurring ? `Every ${event.recurringDay}` : formatDate(event.date)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Clock size={16} className="mr-2 text-red-500" />
          <span>{event.time}</span>
        </div>
        
        <p className="text-gray-700">{event.description}</p>
        
        {event.recurring && (
          <div className="mt-3">
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full uppercase">
              Weekly Event
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;