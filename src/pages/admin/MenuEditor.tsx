import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { menuItems } from '../../data/menuItems';
import toast from 'react-hot-toast';

const MenuEditor: React.FC = () => {
  const [items, setItems] = useState(menuItems);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingItem(id);
  };

  const handleSave = (id: number, updatedData: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
    setEditingItem(null);
    toast.success('Menu item updated successfully!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
      toast.success('Menu item deleted successfully!');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Menu Items</h1>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Featured</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 capitalize">{item.category}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  {item.featured ? '✓' : '-'}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default MenuEditor;