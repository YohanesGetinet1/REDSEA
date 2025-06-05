// src/pages/admin/BusinessHoursEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, XCircle, Save, Clock } from 'lucide-react'; // Added Clock
import toast from 'react-hot-toast';
import {
  collection,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { BusinessHours as BusinessHoursType } from '../../types'; // Renamed to avoid conflict

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialFormState: { hours: string } = {
  hours: '',
};

const BusinessHoursEditor: React.FC = () => {
  const [hoursByDay, setHoursByDay] = useState<Record<string, BusinessHoursType>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ hours: string }>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  const fetchBusinessHours = async () => {
    setLoading(true);
    try {
      const hoursData: Record<string, BusinessHoursType> = {};
      const querySnapshot = await getDocs(collection(db, 'businessHours'));
      querySnapshot.forEach((snapDoc) => {
        if (daysOfWeek.includes(snapDoc.id)) {
          hoursData[snapDoc.id] = {
            docId: snapDoc.id,
            day: snapDoc.data().day || snapDoc.id,
            hours: snapDoc.data().hours,
          };
        }
      });

      daysOfWeek.forEach(day => {
        if (!hoursData[day]) {
          hoursData[day] = { docId: day, day: day, hours: 'Not Set' };
        }
      });
      setHoursByDay(hoursData);
    } catch (error) {
      console.error('Error fetching business hours: ', error);
      toast.error('Failed to fetch business hours.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessHours();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModalForEdit = (day: string) => {
    setEditingDay(day);
    const currentHours = hoursByDay[day];
    if (currentHours) {
      setFormData({
        hours: currentHours.hours === 'Not Set' ? '' : currentHours.hours,
      });
    } else {
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDay(null);
    setFormData(initialFormState);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingDay) return;
    setFormLoading(true);

    if (!formData.hours.trim()) {
        toast.error("Hours information is required.");
        setFormLoading(false);
        return;
    }

    const firestoreData = {
      day: editingDay,
      hours: formData.hours,
    };

    try {
      const hoursRef = doc(db, 'businessHours', editingDay);
      await setDoc(hoursRef, firestoreData);
      toast.success(`${editingDay}'s hours updated successfully!`);

      setHoursByDay(prevHours => ({
        ...prevHours,
        [editingDay]: {
            docId: editingDay,
            day: editingDay,
            hours: formData.hours
        }
      }));
      // Or call fetchBusinessHours();
      closeModal();
    } catch (error: any) {
      console.error(`Error updating ${editingDay}'s hours: `, error);
      toast.error(error.message || `Failed to update ${editingDay}'s hours.`);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading business hours...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Business Hours</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {daysOfWeek.map((day) => {
              const entry = hoursByDay[day];
              return (
                <tr key={day}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry?.hours || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModalForEdit(day)} className="text-indigo-600 hover:text-indigo-900">
                      <Pencil size={18} /> Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingDay && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><XCircle size={24} /></button>
            <h3 className="text-xl font-semibold mb-6">Edit Hours for {editingDay}</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Hours (e.g., 9:00 AM - 5:00 PM or Closed) <span className="text-red-500">*</span></label>
                <input type="text" name="hours" id="hours" value={formData.hours} onChange={handleInputChange} required className="mt-1 block w-full input-style"/>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
                  <Save size={16} className="mr-2 inline-block"/>
                  {formLoading ? 'Saving...' : 'Save Hours'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Remember to define .input-style, .btn-primary, .btn-secondary in your CSS
// or use equivalent Tailwind classes directly.
export default BusinessHoursEditor;