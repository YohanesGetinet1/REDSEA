// src/pages/admin/TeamMembersEditor.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Pencil, Trash2, Plus, XCircle, User as UserIcon } from 'lucide-react'; // Added UserIcon
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
  orderBy, // For sorting if needed
  query // For sorting if needed
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { TeamMember } from '../../types';

const initialFormState: Omit<TeamMember, 'docId'> = {
  name: '',
  role: '',
  bio: '',
  image: '',
};

const TeamMembersEditor: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'docId'>>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Example: Query with ordering by name. Adjust if another order is preferred.
    const q = query(collection(db, 'teamMembers'), orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(
      q, // Use the query object here
      (querySnapshot) => {
        const membersList: TeamMember[] = [];
        querySnapshot.forEach((snapDoc: QueryDocumentSnapshot<DocumentData>) => {
          membersList.push({
            docId: snapDoc.id,
            ...(snapDoc.data() as Omit<TeamMember, 'docId'>),
          });
        });
        setMembers(membersList);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to team members: ', error);
        toast.error('Failed to listen for team member updates.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setCurrentMember(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (member: TeamMember) => {
    setCurrentMember(member);
    // Destructure to avoid passing docId into formData
    const { docId, ...memberData } = member;
    setFormData(memberData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMember(null);
    setFormData(initialFormState);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    if (!formData.name || !formData.role || !formData.bio || !formData.image) {
      toast.error('All fields (Name, Role, Bio, Image URL) are required.');
      setFormLoading(false);
      return;
    }

    try {
      if (currentMember && currentMember.docId) {
        const memberRef = doc(db, 'teamMembers', currentMember.docId);
        await updateDoc(memberRef, formData); // formData does not contain docId
        toast.success('Team member updated successfully!');
      } else {
        await addDoc(collection(db, 'teamMembers'), formData);
        toast.success('Team member added successfully!');
      }
      closeModal();
    } catch (error: any) {
      console.error('Error saving team member: ', error);
      toast.error(error.message || 'Failed to save team member.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!docId) { toast.error("Invalid member ID."); return; }
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteDoc(doc(db, 'teamMembers', docId));
        toast.success('Team member deleted successfully!');
      } catch (error: any) {
        console.error('Error deleting team member: ', error);
        toast.error(error.message || 'Failed to delete team member.');
      }
    }
  };

  if (loading) {
    return <p className="p-4">Loading team members...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <button
          onClick={openModalForCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Member
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="th-style">Photo</th>
              <th className="th-style">Name</th>
              <th className="th-style">Role</th>
              <th className="th-style text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.length === 0 ? (
              <tr><td colSpan={4} className="td-style text-center">No team members found.</td></tr>
            ) : (
              members.map((member) => (
                <tr key={member.docId}>
                  <td className="td-style">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-12 h-12 object-cover rounded-full"/>
                    ) : (
                      <UserIcon size={30} className="text-gray-300 rounded-full"/>
                    )}
                  </td>
                  <td className="td-style font-medium text-gray-900">{member.name}</td>
                  <td className="td-style">{member.role}</td>
                  <td className="td-style text-right">
                    <button onClick={() => openModalForEdit(member)} className="text-indigo-600 hover:text-indigo-900 mr-3" disabled={!member.docId}><Pencil size={18} /></button>
                    <button onClick={() => member.docId && handleDelete(member.docId)} className="text-red-600 hover:text-red-900" disabled={!member.docId}><Trash2 size={18} /></button>
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
            <h3 className="text-xl font-semibold mb-6">{currentMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="name" className="label-style">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="input-style"/>
              </div>
              <div>
                <label htmlFor="role" className="label-style">Role <span className="text-red-500">*</span></label>
                <input type="text" name="role" id="role" value={formData.role} onChange={handleInputChange} required className="input-style"/>
              </div>
              <div>
                <label htmlFor="bio" className="label-style">Bio <span className="text-red-500">*</span></label>
                <textarea name="bio" id="bio" value={formData.bio} onChange={handleInputChange} required rows={4} className="input-style"></textarea>
              </div>
              <div>
                <label htmlFor="image" className="label-style">Image URL <span className="text-red-500">*</span></label>
                <input type="url" name="image" id="image" value={formData.image} onChange={handleInputChange} required placeholder="https://example.com/photo.jpg" className="input-style"/>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:bg-red-400">
                  {formLoading ? 'Saving...' : (currentMember ? 'Update Member' : 'Add Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Remember to define/ensure utility classes (label-style, input-style, th-style, td-style, btn-primary, btn-secondary)
// are available in your CSS or Tailwind setup. Example:
// .label-style { @apply block text-sm font-medium text-gray-700; }
// .input-style { @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm; }
// .th-style { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
// .td-style { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500; }

export default TeamMembersEditor;