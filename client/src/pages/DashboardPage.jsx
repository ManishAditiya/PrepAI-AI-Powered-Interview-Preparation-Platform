import { useNavigate } from 'react-router-dom';
import { useAuthStore, useInterviewStore, useUserStore } from '../store';
import { interviewAPI, userAPI } from '../api/client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Zap, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { interviews, setInterviews } = useInterviewStore();
  const { stats, setStats } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [interviewsRes, statsRes] = await Promise.all([
        interviewAPI.getAll(),
        userAPI.getStats(),
      ]);
      setInterviews(interviewsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const mockPerformanceData = [
    { month: 'Week 1', score: 65 },
    { month: 'Week 2', score: 72 },
    { month: 'Week 3', score: 78 },
    { month: 'Week 4', score: 85 },
  ];

  const mockInterviewTypes = [
    { name: 'Technical', value: 12 },
    { name: 'Behavioral', value: 8 },
    { name: 'System Design', value: 5 },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold gradient-text mb-2'>Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className='text-gray-600'>Here's your interview preparation progress</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatsCard
            icon={<BookOpen size={24} />}
            label='Total Interviews'
            value={interviews?.length || 0}
            color='blue'
          />
          <StatsCard
            icon={<Trophy size={24} />}
            label='Average Score'
            value={stats?.averageScore ? `${Math.round(stats.averageScore)}%` : 'N/A'}
            color='purple'
          />
          <StatsCard
            icon={<TrendingUp size={24} />}
            label='Improvement'
            value={stats?.improvement ? `+${stats.improvement}%` : '+0%'}
            color='green'
          />
          <StatsCard
            icon={<Zap size={24} />}
            label='Streak'
            value={stats?.streak || 0}
            color='orange'
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          {/* Performance Chart */}
          <div className='lg:col-span-2 card'>
            <h2 className='text-xl font-bold mb-4'>Performance Trend</h2>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='score' stroke='#2563eb' strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Interview Types */}
          <div className='card'>
            <h2 className='text-xl font-bold mb-4'>Interview Types</h2>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={mockInterviewTypes}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='value' fill='#7c3aed' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className='card'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold'>Recent Interviews</h2>
            <button
              onClick={() => navigate('/interviews')}
              className='text-blue-600 font-medium hover:underline'
            >
              View All
            </button>
          </div>

          {loading ? (
            <div className='text-center py-8 text-gray-500'>Loading...</div>
          ) : interviews?.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-3 px-4 font-semibold'>Interview Type</th>
                    <th className='text-left py-3 px-4 font-semibold'>Duration</th>
                    <th className='text-left py-3 px-4 font-semibold'>Score</th>
                    <th className='text-left py-3 px-4 font-semibold'>Date</th>
                    <th className='text-center py-3 px-4 font-semibold'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews?.slice(0, 5).map((interview) => (
                    <tr key={interview._id} className='border-b hover:bg-slate-50'>
                      <td className='py-3 px-4'>{interview.type || 'General'}</td>
                      <td className='py-3 px-4'>{interview.duration || 'N/A'} min</td>
                      <td className='py-3 px-4'>
                        <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                          {interview.score || 'N/A'}%
                        </span>
                      </td>
                      <td className='py-3 px-4'>{new Date(interview.createdAt).toLocaleDateString()}</td>
                      <td className='py-3 px-4 text-center'>
                        <button
                          onClick={() => navigate(`/interview/${interview._id}`)}
                          className='text-blue-600 font-medium hover:underline'
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-gray-500 mb-4'>No interviews yet. Start your first interview!</p>
              <button
                onClick={() => navigate('/new-interview')}
                className='btn-primary'
              >
                Start Interview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, color }) {
  const colorStyles = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorStyles[color]} text-white rounded-xl p-6 card shadow-lg hover:shadow-xl transition-all`}>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-white/80 text-sm font-medium'>{label}</p>
          <p className='text-3xl font-bold mt-2'>{value}</p>
        </div>
        <div className='text-white/50'>{icon}</div>
      </div>
    </div>
  );
}
