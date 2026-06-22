import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewAPI } from '../api/client';
import { useInterviewStore } from '../store';
import { Zap, Code, Users, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const INTERVIEW_TYPES = [
  {
    id: 'technical',
    name: 'Technical Interview',
    description: 'Practice coding problems and technical concepts',
    icon: <Code size={32} />,
    color: 'blue',
  },
  {
    id: 'behavioral',
    name: 'Behavioral Interview',
    description: 'Practice common behavioral questions',
    icon: <Users size={32} />,
    color: 'purple',
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Practice large-scale system design questions',
    icon: <Briefcase size={32} />,
    color: 'green',
  },
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export default function NewInterviewPage() {
  const navigate = useNavigate();
  const { addInterview } = useInterviewStore();
  const [selectedType, setSelectedType] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [jobRole, setJobRole] = useState('');
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    if (!selectedType) {
      toast.error('Please select interview type');
      return;
    }

    try {
      setLoading(true);
      const res = await interviewAPI.create({
        type: selectedType,
        difficulty,
        jobRole,
        duration,
      });
      addInterview(res.data);
      toast.success('Interview started!');
      navigate(`/interview/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold gradient-text mb-3'>Start New Interview</h1>
          <p className='text-gray-600 text-lg'>Choose your interview type and settings</p>
        </div>

        {/* Step 1: Interview Type */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold mb-6'>Step 1: Choose Interview Type</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {INTERVIEW_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`card text-center transition-all ${
                  selectedType === type.id
                    ? 'ring-2 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className='text-4xl text-blue-600 mb-3 flex justify-center'>{type.icon}</div>
                <h3 className='font-bold text-lg mb-2'>{type.name}</h3>
                <p className='text-gray-600 text-sm'>{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Settings */}
        <div className='card mb-8'>
          <h2 className='text-2xl font-bold mb-6'>Step 2: Configure Interview</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Job Role */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Job Role (Optional)</label>
              <input
                type='text'
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder='e.g., Senior Frontend Engineer'
                className='input-field'
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className='input-field'
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Duration: {duration} minutes
              </label>
              <input
                type='range'
                min='15'
                max='120'
                step='5'
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className='w-full'
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
          <h3 className='font-bold text-blue-900 mb-2'>Interview Summary</h3>
          <ul className='text-blue-800 space-y-1'>
            <li>Type: {INTERVIEW_TYPES.find((t) => t.id === selectedType)?.name || 'Not selected'}</li>
            {jobRole && <li>Role: {jobRole}</li>}
            <li>Difficulty: {difficulty}</li>
            <li>Duration: {duration} minutes</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            onClick={() => navigate('/dashboard')}
            className='btn-secondary'
          >
            Cancel
          </button>
          <button
            onClick={handleStartInterview}
            disabled={loading || !selectedType}
            className='btn-primary flex items-center space-x-2'
          >
            <Zap size={20} />
            <span>{loading ? 'Starting...' : 'Start Interview'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
