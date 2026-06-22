import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { feedbackAPI, interviewAPI } from '../api/client';
import { ThumbsUp, ThumbsDown, Download, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeedbackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbackRes, interviewRes] = await Promise.all([
        feedbackAPI.getById(id),
        interviewAPI.getById(id),
      ]);
      setFeedback(feedbackRes.data);
      setInterview(interviewRes.data);
    } catch (error) {
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='min-h-screen py-8 bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='card mb-8'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-3xl font-bold gradient-text mb-2'>Interview Feedback</h1>
              <p className='text-gray-600'>Here's your AI-powered performance analysis</p>
            </div>
            <div className='flex gap-2'>
              <button className='p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100'>
                <Download size={20} />
              </button>
              <button className='p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100'>
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <ScoreCard label='Overall Score' value={feedback?.overallScore} unit='%' />
          <ScoreCard label='Communication' value={feedback?.scores?.communication} unit='/10' />
          <ScoreCard label='Technical Knowledge' value={feedback?.scores?.technical} unit='/10' />
        </div>

        {/* Strengths & Weaknesses */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          {/* Strengths */}
          <div className='card'>
            <h2 className='text-xl font-bold mb-4 flex items-center space-x-2'>
              <ThumbsUp size={24} className='text-green-600' />
              <span>Strengths</span>
            </h2>
            <ul className='space-y-3'>
              {feedback?.strengths?.map((strength, idx) => (
                <li key={idx} className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700'>{strength}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className='card'>
            <h2 className='text-xl font-bold mb-4 flex items-center space-x-2'>
              <ThumbsDown size={24} className='text-orange-600' />
              <span>Areas to Improve</span>
            </h2>
            <ul className='space-y-3'>
              {feedback?.improvements?.map((improvement, idx) => (
                <li key={idx} className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700'>{improvement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className='card mb-8'>
          <h2 className='text-xl font-bold mb-4'>Detailed Analysis</h2>
          <div className='space-y-4 text-gray-700 leading-relaxed'>
            <p>{feedback?.analysis || 'No detailed analysis available.'}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-bold text-blue-900 mb-4'>📋 Recommendations</h2>
          <ul className='space-y-3'>
            {feedback?.recommendations?.map((rec, idx) => (
              <li key={idx} className='flex items-start space-x-3'>
                <span className='text-blue-600 font-bold flex-shrink-0'>{idx + 1}.</span>
                <p className='text-blue-900'>{rec}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            onClick={() => navigate('/interviews')}
            className='btn-secondary'
          >
            View All Interviews
          </button>
          <button
            onClick={() => navigate('/new-interview')}
            className='btn-primary'
          >
            Take Another Interview
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value, unit }) {
  const getColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className='card'>
      <p className='text-gray-600 text-sm font-medium mb-2'>{label}</p>
      <p className={`text-4xl font-bold ${getColor(value)} flex items-end space-x-1`}>
        <span>{value}</span>
        <span className='text-xl'>{unit}</span>
      </p>
    </div>
  );
}
