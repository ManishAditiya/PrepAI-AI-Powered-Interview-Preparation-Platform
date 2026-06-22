import { useState, useEffect } from 'react';
import { useAuthStore, useResumeStore, useUserStore } from '../store';
import { resumeAPI, userAPI } from '../api/client';
import { User, Mail, Phone, MapPin, Upload, Trash2, Edit2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { resumes, setResumes, deleteResume } = useResumeStore();
  const { profile, setProfile } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const [profileRes, resumesRes] = await Promise.all([
        userAPI.getProfile(),
        resumeAPI.getAll(),
      ]);
      setProfile(profileRes.data);
      setResumes(resumesRes.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await userAPI.updateProfile(formData);
      setUser({ ...user, name: formData.name });
      setEditing(false);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Delete this resume?')) {
      try {
        await resumeAPI.delete(id);
        deleteResume(id);
        toast.success('Resume deleted');
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await resumeAPI.upload(file);
      setResumes([res.data, ...resumes]);
      toast.success('Resume uploaded!');
    } catch (error) {
      toast.error('Failed to upload resume');
    }
  };

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-3xl mx-auto px-4'>
        {/* Profile Header */}
        <div className='card mb-8'>
          <div className='flex justify-between items-start mb-6'>
            <div className='flex items-center space-x-6'>
              <div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center'>
                <User size={40} className='text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold'>{user?.name}</h1>
                <p className='text-gray-600'>{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className='p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100'
            >
              <Edit2 size={20} />
            </button>
          </div>

          {/* Edit Mode */}
          {editing ? (
            <div className='space-y-4 pt-6 border-t'>
              <div>
                <label className='block text-sm font-medium mb-2'>Full Name</label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='input-field'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Phone</label>
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className='input-field'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Location</label>
                  <input
                    type='text'
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className='input-field'
                  />
                </div>
              </div>
              <div className='flex gap-2 pt-4'>
                <button onClick={() => setEditing(false)} className='btn-secondary flex-1'>
                  Cancel
                </button>
                <button onClick={handleUpdateProfile} className='btn-primary flex-1'>
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t'>
              <InfoItem icon={<Phone size={18} />} label='Phone' value={profile?.phone} />
              <InfoItem icon={<MapPin size={18} />} label='Location' value={profile?.location} />
              <InfoItem icon={<Mail size={18} />} label='Email' value={user?.email} />
            </div>
          )}
        </div>

        {/* Resumes Section */}
        <div className='card'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>My Resumes</h2>
            <label className='btn-primary flex items-center space-x-2 cursor-pointer'>
              <Upload size={18} />
              <span>Upload Resume</span>
              <input
                type='file'
                onChange={handleResumeUpload}
                accept='.pdf,.doc,.docx'
                className='hidden'
              />
            </label>
          </div>

          {resumes?.length > 0 ? (
            <div className='space-y-3'>
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className='flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100'
                >
                  <div className='flex-1'>
                    <h3 className='font-semibold'>{resume.fileName}</h3>
                    <p className='text-sm text-gray-600'>
                      Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button className='px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100'>
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12 text-gray-500'>
              <p className='mb-4'>No resumes uploaded yet</p>
              <label className='btn-primary cursor-pointer'>
                <Upload size={18} className='inline mr-2' />
                Upload Your First Resume
                <input
                  type='file'
                  onChange={handleResumeUpload}
                  accept='.pdf,.doc,.docx'
                  className='hidden'
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className='flex items-center space-x-2'>
      <div className='text-blue-600'>{icon}</div>
      <div>
        <p className='text-xs text-gray-600'>{label}</p>
        <p className='font-medium'>{value || 'Not set'}</p>
      </div>
    </div>
  );
}
