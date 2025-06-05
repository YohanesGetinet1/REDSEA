// import React, { useState } from 'react';
// import { Pencil, Trash2, Plus } from 'lucide-react';
// import { menuItems } from '../../data/menuItems';
// import toast from 'react-hot-toast';

// const MenuEditor: React.FC = () => {
//   const [items, setItems] = useState(menuItems);
//   const [editingItem, setEditingItem] = useState<number | null>(null);

//   const handleEdit = (id: number) => {
//     setEditingItem(id);
//   };

//   const handleSave = (id: number, updatedData: any) => {
//     setItems(items.map(item => 
//       item.id === id ? { ...item, ...updatedData } : item
//     ));
//     setEditingItem(null);
//     toast.success('Menu item updated successfully!');
//   };

//   const handleDelete = (id: number) => {
//     if (confirm('Are you sure you want to delete this item?')) {
//       setItems(items.filter(item => item.id !== id));
//       toast.success('Menu item deleted successfully!');
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Menu Items</h1>
//         <button
//           className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//         >
//           <Plus size={18} />
//           Add New Item
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Category</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Featured</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(item => (
//               <tr key={item.id} className="border-t">
//                 <td className="px-4 py-2">{item.name}</td>
//                 <td className="px-4 py-2 capitalize">{item.category}</td>
//                 <td className="px-4 py-2">{item.price}</td>
//                 <td className="px-4 py-2">
//                   {item.featured ? '✓' : '-'}
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   <button
//                     onClick={() => handleEdit(item.id)}
//                     className="text-blue-600 hover:text-blue-800 mr-2"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
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

// export default MenuEditor;



// // src/pages/admin/MenuEditor.tsx
// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash2, Plus } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { collection, getDocs, onSnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
// import { db } from '../../firebase/config'; // Your Firestore instance
// import { MenuItem } from '../../types'; // Your updated MenuItem type

// const MenuEditor: React.FC = () => {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const [editingItem, setEditingItem] = useState<string | null>(null); // Will use docId (string)

//   useEffect(() => {
//     setLoading(true);
//     // const fetchItems = async () => {
//     //   try {
//     //     const querySnapshot = await getDocs(collection(db, 'menuItems'));
//     //     const itemsList = querySnapshot.docs.map(doc => ({
//     //       docId: doc.id,
//     //       ...(doc.data() as Omit<MenuItem, 'docId'>),
//     //     }));
//     //     setItems(itemsList);
//     //   } catch (error) {
//     //     console.error("Error fetching menu items: ", error);
//     //     toast.error("Failed to fetch menu items.");
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//     // fetchItems();

//     // Use onSnapshot for real-time updates
//     const unsubscribe = onSnapshot(collection(db, 'menuItems'), (querySnapshot) => {
//       const itemsList: MenuItem[] = [];
//       querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
//         itemsList.push({
//           docId: doc.id,
//           ...(doc.data() as Omit<MenuItem, 'docId'>)
//         });
//       });
//       setItems(itemsList);
//       setLoading(false);
//     }, (error) => {
//       console.error("Error listening to menu items: ", error);
//       toast.error("Failed to listen for menu item updates.");
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount

//   }, []);

//   const handleEdit = (docId: string) => {
//     // setEditingItem(docId);
//     // TODO: Implement edit form/modal population
//     toast.info(`Edit functionality for item ID ${docId} to be implemented.`);
//   };

//   const handleDelete = async (docId: string) => {
//     // TODO: Implement delete functionality with Firestore
//     if (confirm('Are you sure you want to delete this item? This action is not yet connected to the database.')) {
//       // Example of how it would work:
//       // try {
//       //   await deleteDoc(doc(db, 'menuItems', docId));
//       //   toast.success('Menu item deleted successfully!');
//       //   // The onSnapshot listener will automatically update the UI
//       // } catch (error) {
//       //   console.error("Error deleting menu item: ", error);
//       //   toast.error("Failed to delete menu item.");
//       // }
//       toast.warn(`Deletion for item ID ${docId} is a placeholder.`);
//     }
//   };

//   const handleAddNewItem = () => {
//     // TODO: Implement add new item form/modal
//     toast.info('Add new item functionality to be implemented.');
//   };

//   if (loading) {
//     return <p>Loading menu items...</p>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Menu Items</h1>
//         <button
//           onClick={handleAddNewItem}
//           className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//         >
//           <Plus size={18} />
//           Add New Item
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Category</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Featured</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 && !loading ? (
//                 <tr>
//                     <td colSpan={5} className="text-center py-4">No menu items found. Add some!</td>
//                 </tr>
//             ) : (
//                 items.map(item => (
//                 <tr key={item.docId} className="border-t">
//                     <td className="px-4 py-2">{item.name}</td>
//                     <td className="px-4 py-2 capitalize">{item.category}</td>
//                     <td className="px-4 py-2">{item.price}</td>
//                     <td className="px-4 py-2">
//                     {item.featured ? '✓' : '-'}
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                     <button
//                         onClick={() => item.docId && handleEdit(item.docId)}
//                         className="text-blue-600 hover:text-blue-800 mr-2 disabled:opacity-50"
//                         disabled={!item.docId}
//                     >
//                         <Pencil size={18} />
//                     </button>
//                     <button
//                         onClick={() => item.docId && handleDelete(item.docId)}
//                         className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                         disabled={!item.docId}
//                     >
//                         <Trash2 size={18} />
//                     </button>
//                     </td>
//                 </tr>
//                 ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* TODO: Modal/Form for Add/Edit Item will go here */}
//     </div>
//   );
// };

// export default MenuEditor;


// src/pages/admin/MenuEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, Trash2, Plus, XCircle } from 'lucide-react'; // Added XCircle for modal close
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
import { db } from '../../firebase/config';
import { MenuItem } from '../../types';

const initialFormState: Omit<MenuItem, 'docId'> = {
  name: '',
  description: '',
  price: '',
  category: 'drinks', // Default category
  featured: false,
  image: '',
};

const MenuEditor: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null); // For editing
  const [formData, setFormData] = useState<Omit<MenuItem, 'docId'>>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'menuItems'),
      (querySnapshot) => {
        const itemsList: MenuItem[] = [];
        querySnapshot.forEach((snapDoc: QueryDocumentSnapshot<DocumentData>) => {
          itemsList.push({
            docId: snapDoc.id,
            ...(snapDoc.data() as Omit<MenuItem, 'docId'>),
          });
        });
        setItems(itemsList);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to menu items: ', error);
        toast.error('Failed to listen for menu item updates.');
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
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openModalForCreate = () => {
    setCurrentItem(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (item: MenuItem) => {
    setCurrentItem(item);
    // Ensure all fields from MenuItem are present in formData, excluding docId
    const { docId, ...itemData } = item;
    setFormData({
        name: itemData.name || '',
        description: itemData.description || '',
        price: itemData.price || '',
        category: itemData.category || 'drinks',
        featured: itemData.featured || false,
        image: itemData.image || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setFormData(initialFormState);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    if (!formData.name || !formData.category || !formData.price) {
        toast.error("Name, category, and price are required.");
        setFormLoading(false);
        return;
    }

    try {
      if (currentItem && currentItem.docId) {
        // Update existing item
        const itemRef = doc(db, 'menuItems', currentItem.docId);
        await updateDoc(itemRef, formData);
        toast.success('Menu item updated successfully!');
      } else {
        // Add new item
        await addDoc(collection(db, 'menuItems'), formData);
        toast.success('Menu item added successfully!');
      }
      closeModal();
    } catch (error: any) {
      console.error('Error saving menu item: ', error);
      toast.error(error.message || 'Failed to save menu item.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!docId) {
        toast.error("Invalid item ID for deletion.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'menuItems', docId));
        toast.success('Menu item deleted successfully!');
        // onSnapshot will update the list automatically
      } catch (error: any) {
        console.error('Error deleting menu item: ', error);
        toast.error(error.message || 'Failed to delete menu item.');
      }
    }
  };

  if (loading) {
    return <p className="p-4">Loading menu items...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Menu Items</h1>
        <button
          onClick={openModalForCreate}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      {/* Table for displaying items */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No menu items found. Click "Add New Item" to create one.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.docId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mt-1"/>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.featured ? '✓ Yes' : '✗ No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModalForEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      disabled={!item.docId}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => item.docId && handleDelete(item.docId)}
                      className="text-red-600 hover:text-red-900"
                      disabled={!item.docId}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-6">
              {currentItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price <span className="text-red-500">*</span></label>
                <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                <select name="category" id="category" value={formData.category} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                  <option value="drinks">Drinks</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="mains">Main Courses</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="image" id="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"/>
                 {/* We will enhance this to a file upload later */}
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"/>
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured Item</label>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300">
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:bg-red-400">
                  {formLoading ? 'Saving...' : (currentItem ? 'Update Item' : 'Add Item')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuEditor;