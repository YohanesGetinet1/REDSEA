import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { events } from '../../data/events';
import toast from 'react-hot-toast';

const EventEditor: React.FC = () => {
  const [eventsList, setEventsList] = useState(events);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingEvent(id);
  };

  const handleSave = (id: number, updatedData: any) => {
    setEventsList(eventsList.map(event => 
      event.id === id ? { ...event, ...updatedData } : event
    ));
    setEditingEvent(null);
    toast.success('Event updated successfully!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEventsList(eventsList.filter(event => event.id !== id));
      toast.success('Event deleted successfully!');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Recurring</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventsList.map(event => (
              <tr key={event.id} className="border-t">
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">
                  {event.recurring ? `Every ${event.recurringDay}` : event.date}
                </td>
                <td className="px-4 py-2">{event.time}</td>
                <td className="px-4 py-2">
                  {event.recurring ? '✓' : '-'}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventEditor;