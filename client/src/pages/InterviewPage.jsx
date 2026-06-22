import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewAPI, feedbackAPI } from '../api/client';
import { useInterviewStore } from '../store';
import { Mic, Send, Clock, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentInterview, setCurrentInterview } = useInterviewStore();
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [answer, setAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAnswer();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const res = await interviewAPI.getById(id);
      setCurrentInterview(res.data);
    } catch (error) {
      toast.error('Failed to load interview');
      navigate('/interviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    try {
      const res = await interviewAPI.submitAnswer(id, {
        answer: answer || transcript,
        duration: timeLeft,
      });
      toast.success('Answer submitted!');
      setAnswer('');
      setTranscript('');
      setAnswering(false);

      // Generate feedback
      const feedbackRes = await feedbackAPI.generate(id);
      if (feedbackRes.data) {
        navigate(`/interview/${id}/feedback`);
      }
    } catch (error) {
      toast.error('Failed to submit answer');
    }
  };

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      toast.success('Recording started');
    } else {
      setRecording(false);
      toast.success('Recording stopped');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='min-h-screen py-8 bg-gradient-to-br from-blue-50 to-purple-50'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='card mb-8'>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <h1 className='text-3xl font-bold gradient-text mb-2'>
                {currentInterview?.type || 'Interview'} Interview
              </h1>
              <p className='text-gray-600'>{currentInterview?.description}</p>
            </div>
            <div className='flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold'>
              <Clock size={20} />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className='card mb-8'>
          <h2 className='text-xl font-bold mb-4'>Question</h2>
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200'>
            <p className='text-lg text-gray-800 leading-relaxed'>
              {currentInterview?.question || 'Tell us about a challenging project you worked on?'}
            </p>
          </div>
          <button className='mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium'>
            <Volume2 size={18} />
            <span>Hear Question</span>
          </button>
        </div>

        {/* Answer Area */}
        <div className='card mb-8'>
          <h2 className='text-xl font-bold mb-4'>Your Answer</h2>

          {!answering ? (
            <button
              onClick={() => setAnswering(true)}
              className='btn-primary w-full'
            >
              Start Recording / Type Answer
            </button>
          ) : (
            <div className='space-y-4'>
              {/* Recording Options */}
              <div className='flex gap-2'>
                <button
                  onClick={toggleRecording}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                    recording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Mic size={18} />
                  <span>{recording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                  <p className='text-sm text-gray-600 mb-2'>Transcript:</p>
                  <p className='text-gray-800'>{transcript}</p>
                </div>
              )}

              {/* Text Area */}
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Or type your answer here...'
                className='input-field resize-none h-40'
              />

              {/* Submit Button */}
              <div className='flex gap-2'>
                <button
                  onClick={() => setAnswering(false)}
                  className='btn-secondary flex-1'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  className='btn-primary flex-1 flex items-center justify-center space-x-2'
                >
                  <Send size={18} />
                  <span>Submit Answer</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
          <h3 className='font-bold text-green-900 mb-3'>💡 Pro Tips</h3>
          <ul className='text-green-800 space-y-2 text-sm'>
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Structure your answer: Situation → Action → Result</li>
            <li>• Take a moment to think before answering</li>
            <li>• Use examples and specific details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
