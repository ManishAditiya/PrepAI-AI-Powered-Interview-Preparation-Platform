import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewAPI } from '../api/client';
import { useInterviewStore } from '../store';
import { Plus, Filter, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InterviewsPage() {
  const navigate = useNavigate();
  const { interviews, setInterviews, deleteInterview } = useInterviewStore();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await interviewAPI.getAll();
      setInterviews(res.data);
    } catch (error) {
      toast.error('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await interviewAPI.delete(id);
        deleteInterview(id);
        toast.success('Interview deleted');
      } catch (error) {
        toast.error('Failed to delete interview');
      }
    }
  };

  const filteredInterviews = interviews?.filter((i) => {
    if (filter === 'all') return true;
    return i.type === filter;
  });

  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold gradient-text mb-2'>My Interviews</h1>
            <p className='text-gray-600'>Manage and review your practice interviews</p>
          </div>
          <button
            onClick={() => navigate('/new-interview')}
            className='btn-primary flex items-center space-x-2'
          >
            <Plus size={20} />
            <span>New Interview</span>
          </button>
        </div>

        {/* Filters */}
        <div className='mb-6 flex gap-4'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('technical')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'technical'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Technical
          </button>
          <button
            onClick={() => setFilter('behavioral')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'behavioral'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Behavioral
          </button>
        </div>

        {/* Interviews List */}
        {loading ? (
          <div className='text-center py-12 text-gray-500'>Loading...</div>
        ) : filteredInterviews?.length > 0 ? (
          <div className='grid gap-4'>
            {filteredInterviews.map((interview) => (
              <div key={interview._id} className='card flex justify-between items-center hover:shadow-lg transition'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold mb-1'>{interview.type || 'General'} Interview</h3>
                  <p className='text-gray-600 text-sm mb-2'>{interview.description}</p>
                  <div className='flex gap-4 text-sm text-gray-500'>
                    <span>{new Date(interview.createdAt).toLocaleDateString()}</span>
                    <span>{interview.duration || 'N/A'} min</span>
                    <span className='badge badge-success'>{interview.score || 'N/A'}% Score</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => navigate(`/interview/${interview._id}`)}
                    className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition'
                    title='View Interview'
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(interview._id)}
                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition'
                    title='Delete Interview'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='card text-center py-12'>
            <p className='text-gray-500 mb-4'>No interviews yet</p>
            <button
              onClick={() => navigate('/new-interview')}
              className='btn-primary'
            >
              Start Your First Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
