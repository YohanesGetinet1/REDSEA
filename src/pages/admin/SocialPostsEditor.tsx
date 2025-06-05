// src/pages/admin/SocialPostsEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, Trash2, Plus, XCircle, Image as ImageIcon } from 'lucide-react'; // Added ImageIcon
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
  Timestamp, // For potential future use
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { SocialPost } from '../../types';

const initialFormState: Omit<SocialPost, 'docId'> = {
  caption: '',
  image: '',
  date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD
  likes: 0,
  url: '#',
};

const SocialPostsEditor: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<SocialPost | null>(null);
  const [formData, setFormData] = useState<Omit<SocialPost, 'docId'>>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'socialPosts'),
      (querySnapshot) => {
        const postsList: SocialPost[] = [];
        querySnapshot.forEach((snapDoc: QueryDocumentSnapshot<DocumentData>) => {
          const data = snapDoc.data();
          // Handle Firestore Timestamp if stored that way, otherwise assume string
          let dateString = data.date;
          if (data.date && data.date instanceof Timestamp) {
            dateString = data.date.toDate().toISOString().split('T')[0];
          }

          postsList.push({
            docId: snapDoc.id,
            caption: data.caption,
            image: data.image,
            date: dateString, // Ensure it's a string for the form input type="date"
            likes: data.likes,
            url: data.url,
          });
        });
        // Optionally sort posts by date, most recent first
        postsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(postsList);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to social posts: ', error);
        toast.error('Failed to listen for social post updates.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const openModalForCreate = () => {
    setCurrentPost(null);
    // Reset date to today for new posts
    setFormData({...initialFormState, date: new Date().toISOString().split('T')[0]});
    setIsModalOpen(true);
  };

  const openModalForEdit = (post: SocialPost) => {
    setCurrentPost(post);
    setFormData({
      caption: post.caption || '',
      image: post.image || '',
      // Ensure date is in YYYY-MM-DD for the input type="date"
      date: post.date ? new Date(post.date).toISOString().split('T')[0] : '',
      likes: post.likes || 0,
      url: post.url || '#',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setFormData(initialFormState);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    if (!formData.caption || !formData.image || !formData.date) {
      toast.error('Caption, Image URL, and Date are required.');
      setFormLoading(false);
      return;
    }

    // Consider converting formData.date to Firestore Timestamp if you want to store it that way
    // For now, saving as string as per existing setup.
    // const dataToSave = {
    //   ...formData,
    //   date: Timestamp.fromDate(new Date(formData.date)) // Example for Timestamp
    // };
    const dataToSave = { ...formData };


    try {
      if (currentPost && currentPost.docId) {
        const postRef = doc(db, 'socialPosts', currentPost.docId);
        await updateDoc(postRef, dataToSave);
        toast.success('Social post updated successfully!');
      } else {
        await addDoc(collection(db, 'socialPosts'), dataToSave);
        toast.success('Social post added successfully!');
      }
      closeModal();
    } catch (error: any) {
      console.error('Error saving social post: ', error);
      toast.error(error.message || 'Failed to save social post.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!docId) { toast.error("Invalid post ID."); return; }
    if (window.confirm('Are you sure you want to delete this social post?')) {
      try {
        await deleteDoc(doc(db, 'socialPosts', docId));
        toast.success('Social post deleted successfully!');
      } catch (error: any)            {
        console.error('Error deleting social post: ', error);
        toast.error(error.message || 'Failed to delete social post.');
      }
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return dateString; }
  };


  if (loading) {
    return <p className="p-4">Loading social posts...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Social Media Posts</h1>
        <button
          onClick={openModalForCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Post
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="th-style">Image</th>
              <th className="th-style">Caption</th>
              <th className="th-style">Date</th>
              <th className="th-style">Likes</th>
              <th className="th-style text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="td-style text-center">No social posts found.</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.docId}>
                  <td className="td-style">
                    {post.image ? (
                      <img src={post.image} alt="Social media visual" className="w-20 h-20 object-cover rounded"/>
                    ) : (
                      <ImageIcon size={40} className="text-gray-300"/>
                    )}
                  </td>
                  <td className="td-style max-w-xs truncate">{post.caption}</td>
                  <td className="td-style">{formatDateForDisplay(post.date)}</td>
                  <td className="td-style">{post.likes}</td>
                  <td className="td-style text-right">
                    <button onClick={() => openModalForEdit(post)} className="text-indigo-600 hover:text-indigo-900 mr-3" disabled={!post.docId}><Pencil size={18} /></button>
                    <button onClick={() => post.docId && handleDelete(post.docId)} className="text-red-600 hover:text-red-900" disabled={!post.docId}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
          <div className="relative p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><XCircle size={24} /></button>
            <h3 className="text-xl font-semibold mb-6">{currentPost ? 'Edit Social Post' : 'Add New Social Post'}</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="caption" className="label-style">Caption <span className="text-red-500">*</span></label>
                <textarea name="caption" id="caption" value={formData.caption} onChange={handleInputChange} required rows={3} className="input-style"></textarea>
              </div>
              <div>
                <label htmlFor="image" className="label-style">Image URL <span className="text-red-500">*</span></label>
                <input type="url" name="image" id="image" value={formData.image} onChange={handleInputChange} required placeholder="https://example.com/image.jpg" className="input-style"/>
              </div>
              <div>
                <label htmlFor="date" className="label-style">Date <span className="text-red-500">*</span></label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required className="input-style"/>
              </div>
              <div>
                <label htmlFor="likes" className="label-style">Likes</label>
                <input type="number" name="likes" id="likes" value={formData.likes} onChange={handleInputChange} min="0" className="input-style"/>
              </div>
              <div>
                <label htmlFor="url" className="label-style">Post URL (Link to actual post)</label>
                <input type="url" name="url" id="url" value={formData.url} onChange={handleInputChange} placeholder="https://instagram.com/p/..." className="input-style"/>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
                  {formLoading ? 'Saving...' : (currentPost ? 'Update Post' : 'Add Post')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Suggested utility classes for index.css or Tailwind @apply
// .label-style { @apply block text-sm font-medium text-gray-700; }
// .input-style { @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm; }
// .th-style { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
// .td-style { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500; }
// .btn-primary { @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }
// .btn-secondary { @apply inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500; }

export default SocialPostsEditor;