// import React, { useState } from 'react';
// import { Pencil, Trash2, Plus } from 'lucide-react';
// import { events } from '../../data/events';
// import toast from 'react-hot-toast';

// const EventEditor: React.FC = () => {
//   const [eventsList, setEventsList] = useState(events);
//   const [editingEvent, setEditingEvent] = useState<number | null>(null);

//   const handleEdit = (id: number) => {
//     setEditingEvent(id);
//   };

//   const handleSave = (id: number, updatedData: any) => {
//     setEventsList(eventsList.map(event => 
//       event.id === id ? { ...event, ...updatedData } : event
//     ));
//     setEditingEvent(null);
//     toast.success('Event updated successfully!');
//   };

//   const handleDelete = (id: number) => {
//     if (confirm('Are you sure you want to delete this event?')) {
//       setEventsList(eventsList.filter(event => event.id !== id));
//       toast.success('Event deleted successfully!');
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Events</h1>
//         <button
//           className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//         >
//           <Plus size={18} />
//           Add New Event
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Time</th>
//               <th className="px-4 py-2 text-left">Recurring</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eventsList.map(event => (
//               <tr key={event.id} className="border-t">
//                 <td className="px-4 py-2">{event.title}</td>
//                 <td className="px-4 py-2">
//                   {event.recurring ? `Every ${event.recurringDay}` : event.date}
//                 </td>
//                 <td className="px-4 py-2">{event.time}</td>
//                 <td className="px-4 py-2">
//                   {event.recurring ? '✓' : '-'}
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   <button
//                     onClick={() => handleEdit(event.id)}
//                     className="text-blue-600 hover:text-blue-800 mr-2"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(event.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventEditor;



// src/pages/admin/EventEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, Trash2, Plus, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/config'; // Your Firestore instance
import { Event as EventType } from '../../types'; // Renamed to EventType to avoid conflict with DOM Event

const initialEventFormState: Omit<EventType, 'docId'> = {
  title: '',
  description: '',
  date: '',
  time: '',
  image: '',
  recurring: false,
  recurringDay: '',
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EventEditor: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState<Omit<EventType, 'docId'>>(initialEventFormState);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'events'),
      (querySnapshot) => {
        const eventsList: EventType[] = [];
        querySnapshot.forEach((snapDoc: QueryDocumentSnapshot<DocumentData>) => {
          eventsList.push({
            docId: snapDoc.id,
            ...(snapDoc.data() as Omit<EventType, 'docId'>),
          });
        });
        setEvents(eventsList);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to events: ', error);
        toast.error('Failed to listen for event updates.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // If recurring is unchecked, clear recurringDay
        ...(name === 'recurring' && !checked && { recurringDay: '' }),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openModalForCreate = () => {
    setCurrentEvent(null);
    setFormData(initialEventFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (event: EventType) => {
    setCurrentEvent(event);
    const { docId, ...eventData } = event;
    setFormData({
      title: eventData.title || '',
      description: eventData.description || '',
      date: eventData.date || '',
      time: eventData.time || '',
      image: eventData.image || '',
      recurring: eventData.recurring || false,
      recurringDay: eventData.recurringDay || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setFormData(initialEventFormState);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    if (!formData.title || !formData.image || (!formData.recurring && !formData.date) || (formData.recurring && !formData.recurringDay) || !formData.time) {
      toast.error('Please fill all required fields: Title, Image URL, Time. Also Date (if not recurring) or Recurring Day (if recurring).');
      setFormLoading(false);
      return;
    }

    let dataToSave = { ...formData };
    if (!dataToSave.recurring) {
        dataToSave.recurringDay = ''; // Clear recurringDay if not recurring
    } else {
        dataToSave.date = ''; // Clear specific date if recurring
    }


    try {
      if (currentEvent && currentEvent.docId) {
        const eventRef = doc(db, 'events', currentEvent.docId);
        await updateDoc(eventRef, dataToSave);
        toast.success('Event updated successfully!');
      } else {
        await addDoc(collection(db, 'events'), dataToSave);
        toast.success('Event added successfully!');
      }
      closeModal();
    } catch (error: any) {
      console.error('Error saving event: ', error);
      toast.error(error.message || 'Failed to save event.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!docId) {
        toast.error("Invalid event ID for deletion.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', docId));
        toast.success('Event deleted successfully!');
      } catch (error: any) {
        console.error('Error deleting event: ', error);
        toast.error(error.message || 'Failed to delete event.');
      }
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        // Ensure date is valid before formatting
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return dateString; // fallback to original if parsing fails
    }
  };


  if (loading) {
    return <p className="p-4">Loading events...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <button
          onClick={openModalForCreate}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Event
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No events found.</td></tr>
            ) : (
              events.map((event) => (
                <tr key={event.docId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    {event.image && <img src={event.image} alt={event.title} className="w-16 h-10 object-cover rounded mt-1"/>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.recurring ? `Every ${event.recurringDay}` : formatDateForDisplay(event.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.recurring ? '✓ Yes' : '✗ No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModalForEdit(event)} className="text-indigo-600 hover:text-indigo-900 mr-3" disabled={!event.docId}><Pencil size={18} /></button>
                    <button onClick={() => event.docId && handleDelete(event.docId)} className="text-red-600 hover:text-red-900" disabled={!event.docId}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><XCircle size={24} /></button>
            <h3 className="text-xl font-semibold mb-6">{currentEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full input-style"/>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style"></textarea>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL <span className="text-red-500">*</span></label>
                <input type="text" name="image" id="image" value={formData.image} onChange={handleInputChange} required placeholder="https://example.com/image.jpg" className="mt-1 block w-full input-style"/>
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time (e.g., 8:00 PM - 11:00 PM) <span className="text-red-500">*</span></label>
                <input type="text" name="time" id="time" value={formData.time} onChange={handleInputChange} required className="mt-1 block w-full input-style"/>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="recurring" id="recurring" checked={formData.recurring} onChange={handleInputChange} className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"/>
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">Is this a recurring event?</label>
              </div>
              {formData.recurring ? (
                <div>
                  <label htmlFor="recurringDay" className="block text-sm font-medium text-gray-700">Recurring Day <span className="text-red-500">*</span></label>
                  <select name="recurringDay" id="recurringDay" value={formData.recurringDay} onChange={handleInputChange} required={formData.recurring} className="mt-1 block w-full input-style">
                    <option value="">Select a day</option>
                    {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date (YYYY-MM-DD) <span className="text-red-500">*</span></label>
                  <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required={!formData.recurring} className="mt-1 block w-full input-style"/>
                </div>
              )}
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
                  {formLoading ? 'Saving...' : (currentEvent ? 'Update Event' : 'Add Event')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
// Helper CSS classes (add to your index.css or a shared stylesheet if not already covered by Tailwind utility classes)
// .input-style { padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: sm; focus:outline-none; focus:ring-red-500; focus:border-red-500; width: 100%; font-size: 0.875rem; }
// .btn-primary { padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: white; background-color: #E11D48; hover:bg-red-700; border-radius: 0.375rem; }
// .btn-secondary { padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: #374151; background-color: #F3F4F6; hover:bg-gray-200; border-radius: 0.375rem; border: 1px solid #D1D5DB; }


export default EventEditor;