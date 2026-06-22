import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Zap, Brain, TrendingUp, Users, ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h1 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
                Master Your Interviews with AI
              </h1>
              <p className='text-xl text-blue-100 mb-8'>
                Get personalized feedback from advanced AI to ace your next job interview. Practice smart, interview confident.
              </p>
              <div className='flex gap-4'>
                <button
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                  className='bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 flex items-center space-x-2 transition'
                >
                  <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className='border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition'
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl opacity-20 rounded-3xl'></div>
                <div className='relative bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20'>
                  <div className='space-y-4'>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className='bg-white/5 h-12 rounded-lg animate-pulse' />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-16 gradient-text'>Why Choose PrepAI?</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <FeatureCard
              icon={<Brain size={32} />}
              title='AI-Powered Feedback'
              description='Get intelligent feedback powered by Google Gemini AI'
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title='Instant Analysis'
              description='Real-time feedback on your communication and technical skills'
            />
            <FeatureCard
              icon={<TrendingUp size={32} />}
              title='Track Progress'
              description='Monitor your improvement over multiple interview sessions'
            />
            <FeatureCard
              icon={<Users size={32} />}
              title='Multiple Formats'
              description='Practice technical, behavioral, and system design interviews'
            />
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className='py-20 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-16 gradient-text'>How PrepAI Works</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <StepCard number={1} title='Choose Interview Type' description='Select from technical, behavioral, or system design interviews' />
            <StepCard number={2} title='Practice Live' description='Simulate real interview conditions with AI questions' />
            <StepCard number={3} title='Get Feedback' description='Receive detailed AI analysis and improvement tips' />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-4'>Ready to Transform Your Interview Skills?</h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join thousands of job seekers who have improved their interview performance with PrepAI
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? '/new-interview' : '/register')}
            className='bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 flex items-center space-x-2 transition mx-auto text-lg'
          >
            <Play size={20} />
            <span>{isAuthenticated ? 'Start Interview' : 'Start Free Trial'}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-gray-400 py-8'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <p>&copy; 2024 PrepAI. All rights reserved. Ace Your Interviews with AI.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className='card text-center'>
      <div className='text-blue-600 mb-4 flex justify-center'>{icon}</div>
      <h3 className='text-xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className='card'>
      <div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4'>
        {number}
      </div>
      <h3 className='text-xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}
