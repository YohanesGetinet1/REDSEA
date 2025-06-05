// // src/pages/admin/DailySpecialsEditor.tsx
// import React, { useState, useEffect, FormEvent } from 'react';
// import { Pencil, XCircle, Save } from 'lucide-react';
// import toast from 'react-hot-toast';
// import {
//   collection,
//   doc,
//   getDoc,
//   setDoc, // Using setDoc is convenient here as we know the doc IDs (days)
//   getDocs,
//   DocumentData,
// } from 'firebase/firestore';
// import { db } from '../../firebase/config';
// import { DailySpecial } from '../../types';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const initialFormState: Omit<DailySpecial, 'docId' | 'day'> = {
//   title: '',
//   description: '',
//   price: '',
// };

// const DailySpecialsEditor: React.FC = () => {
//   const [specials, setSpecials] = useState<Record<string, DailySpecial>>({});
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingDay, setEditingDay] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Omit<DailySpecial, 'docId' | 'day'>>(initialFormState);
//   const [formLoading, setFormLoading] = useState(false);

//   const fetchSpecials = async () => {
//     setLoading(true);
//     try {
//       const specialsData: Record<string, DailySpecial> = {};
//       const querySnapshot = await getDocs(collection(db, 'dailySpecials'));
//       querySnapshot.forEach((snapDoc) => {
//         if (daysOfWeek.includes(snapDoc.id)) { // Ensure we only process known days
//           specialsData[snapDoc.id] = {
//             docId: snapDoc.id,
//             day: snapDoc.id, // or snapDoc.data().day
//             ...(snapDoc.data() as Omit<DailySpecial, 'docId' | 'day'>),
//           };
//         }
//       });
//       // Ensure all days are present, even if not in Firestore yet
//       daysOfWeek.forEach(day => {
//         if (!specialsData[day]) {
//           specialsData[day] = { docId: day, day: day, title: 'Not Set', description: '', price: '' };
//         }
//       });
//       setSpecials(specialsData);
//     } catch (error) {
//       console.error('Error fetching daily specials: ', error);
//       toast.error('Failed to fetch daily specials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpecials();
//     // No onSnapshot here for simplicity, assuming specials don't change extremely frequently
//     // and admin is the only one changing them through this interface.
//     // If real-time updates from other sources are possible, onSnapshot could be used per document.
//   }, []);

//   const openModalForEdit = (day: string) => {
//     setEditingDay(day);
//     const currentSpecial = specials[day];
//     if (currentSpecial) {
//       setFormData({
//         title: currentSpecial.title === 'Not Set' ? '' : currentSpecial.title,
//         description: currentSpecial.description,
//         price: currentSpecial.price,
//       });
//     } else {
//       setFormData(initialFormState);
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingDay(null);
//     setFormData(initialFormState);
//   };

//   const handleSubmitForm = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!editingDay) return;
//     setFormLoading(true);

//     if (!formData.title) {
//         toast.error("Title is required.");
//         setFormLoading(false);
//         return;
//     }

//     const specialDataToSave: DailySpecial = {
//       docId: editingDay, // This isn't stored in Firestore fields, it's the ID
//       day: editingDay,
//       title: formData.title,
//       description: formData.description,
//       price: formData.price,
//     };
//     // Firestore data should not contain docId as a field if it's the document's actual ID
//     const { docId, ...firestoreData } = specialDataToSave;


//     try {
//       const specialRef = doc(db, 'dailySpecials', editingDay);
//       await setDoc(specialRef, firestoreData); // setDoc will create or overwrite
//       toast.success(`${editingDay}'s special updated successfully!`);
//       fetchSpecials(); // Re-fetch to update the local state
//       closeModal();
//     } catch (error: any) {
//       console.error(`Error updating ${editingDay}'s special: `, error);
//       toast.error(error.message || `Failed to update ${editingDay}'s special.`);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   if (loading) {
//     return <p className="p-4">Loading daily specials...</p>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Daily Specials</h1>
//         {/* No "Add New" button as days are fixed */}
//       </div>

//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50 border-b">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {daysOfWeek.map((day) => {
//               const special = specials[day];
//               return (
//                 <tr key={day}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{special?.title || 'N/A'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{special?.price || 'N/A'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button onClick={() => openModalForEdit(day)} className="text-indigo-600 hover:text-indigo-900">
//                       <Pencil size={18} /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && editingDay && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//           <div className="relative p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
//             <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><XCircle size={24} /></button>
//             <h3 className="text-xl font-semibold mb-6">Edit Special for {editingDay}</h3>
//             <form onSubmit={handleSubmitForm} className="space-y-4">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
//                 <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full input-style"/>
//               </div>
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style"></textarea>
//               </div>
//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//                 <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} className="mt-1 block w-full input-style"/>
//               </div>
//               <div className="pt-4 flex justify-end space-x-3">
//                 <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
//                 <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
//                   <Save size={16} className="mr-2 inline-block"/>{formLoading ? 'Saving...' : 'Save Special'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Ensure input-style, btn-primary, btn-secondary classes are defined in your CSS/Tailwind setup
// // For example:
// // .input-style { @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm; }
// // .btn-primary { @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }
// // .btn-secondary { @apply inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }


// export default DailySpecialsEditor;



// src/pages/admin/DailySpecialsEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, XCircle, Save } from 'lucide-react'; // Ensure Save is imported if used
import toast from 'react-hot-toast';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  DocumentData, // Keep if using snapDoc.data() directly before casting
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { DailySpecial } from '../../types';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Simplified initialFormState for DailySpecial
const initialFormState: Omit<DailySpecial, 'docId' | 'day'> = {
  title: '',
  description: '',
  price: '',
};

const DailySpecialsEditor: React.FC = () => {
  const [specials, setSpecials] = useState<Record<string, DailySpecial>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<DailySpecial, 'docId' | 'day'>>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  const fetchSpecials = async () => {
    setLoading(true);
    try {
      const specialsData: Record<string, DailySpecial> = {};
      const querySnapshot = await getDocs(collection(db, 'dailySpecials'));
      querySnapshot.forEach((snapDoc) => {
        // Ensure snapDoc.id is one of the defined daysOfWeek to avoid processing unexpected docs
        if (daysOfWeek.includes(snapDoc.id)) {
          specialsData[snapDoc.id] = {
            docId: snapDoc.id, // Store the document ID (day name)
            day: snapDoc.data().day || snapDoc.id, // Use field 'day' or fallback to doc.id
            title: snapDoc.data().title,
            description: snapDoc.data().description,
            price: snapDoc.data().price,
          };
        }
      });

      // Ensure all days of the week are represented in the specials object
      // Initialize with default values if not found in Firestore
      daysOfWeek.forEach(day => {
        if (!specialsData[day]) {
          specialsData[day] = { docId: day, day: day, title: 'Not Set', description: '', price: '' };
        }
      });
      setSpecials(specialsData);
    } catch (error) {
      console.error('Error fetching daily specials: ', error);
      toast.error('Failed to fetch daily specials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  // Corrected and simplified handleInputChange
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModalForEdit = (day: string) => {
    setEditingDay(day);
    const currentSpecial = specials[day];
    if (currentSpecial) {
      setFormData({
        title: currentSpecial.title === 'Not Set' ? '' : currentSpecial.title,
        description: currentSpecial.description || '', // Ensure it handles undefined
        price: currentSpecial.price || '', // Ensure it handles undefined
      });
    } else {
      // This case should ideally not happen if fetchSpecials initializes all days
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

    if (!formData.title.trim()) { // Added .trim() for validation
        toast.error("Title is required.");
        setFormLoading(false);
        return;
    }

    // Prepare data for Firestore (excluding docId as it's the document's ID)
    const firestoreData = {
      day: editingDay, // Storing the 'day' field explicitly
      title: formData.title,
      description: formData.description,
      price: formData.price,
    };

    try {
      const specialRef = doc(db, 'dailySpecials', editingDay);
      await setDoc(specialRef, firestoreData);
      toast.success(`${editingDay}'s special updated successfully!`);
      // Optimistically update local state or re-fetch
      setSpecials(prevSpecials => ({
        ...prevSpecials,
        [editingDay]: {
            docId: editingDay,
            day: editingDay,
            ...formData
        }
      }));
      // Or call fetchSpecials() if you prefer to ensure full consistency with DB
      // fetchSpecials();
      closeModal();
    } catch (error: any) {
      console.error(`Error updating ${editingDay}'s special: `, error);
      toast.error(error.message || `Failed to update ${editingDay}'s special.`);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading daily specials...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Daily Specials</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {daysOfWeek.map((day) => {
              const special = specials[day]; // specials should be populated by fetchSpecials
              return (
                <tr key={day}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{special?.title || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{special?.price || 'N/A'}</td>
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

      {/* Modal for Edit Special (No Add/Delete for days themselves) */}
      {isModalOpen && editingDay && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><XCircle size={24} /></button>
            <h3 className="text-xl font-semibold mb-6">Edit Special for {editingDay}</h3>
            {/* Make sure handleInputChange is correctly referenced below */}
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} className="mt-1 block w-full input-style"/>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
                  <Save size={16} className="mr-2 inline-block"/>
                  {formLoading ? 'Saving...' : 'Save Special'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
// Add these utility classes to your index.css if you haven't already, or use equivalent Tailwind classes directly
// .input-style { @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm; }
// .btn-primary { @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }
// .btn-secondary { @apply inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }

export default DailySpecialsEditor;