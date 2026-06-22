import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div 
            className='flex items-center space-x-2 cursor-pointer'
            onClick={() => navigate('/')}
          >
            <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>PA</span>
            </div>
            <span className='text-xl font-bold gradient-text'>PrepAI</span>
          </div>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className='hidden md:flex space-x-6'>
              <button 
                onClick={() => navigate('/dashboard')}
                className='text-gray-600 hover:text-blue-600 transition'
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/interviews')}
                className='text-gray-600 hover:text-blue-600 transition'
              >
                Interviews
              </button>
              <button 
                onClick={() => navigate('/resources')}
                className='text-gray-600 hover:text-blue-600 transition'
              >
                Resources
              </button>
            </div>
          )}

          {/* User Menu */}
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <div className='flex items-center space-x-4'>
                <button 
                  onClick={() => navigate('/profile')}
                  className='flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition'
                >
                  <User size={18} />
                  <span className='hidden sm:inline text-sm font-medium'>{user?.name?.split(' ')[0]}</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className='flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition'
                >
                  <LogOut size={18} />
                  <span className='hidden sm:inline text-sm'>Logout</span>
                </button>
              </div>
            ) : (
              <div className='space-x-2'>
                <button 
                  onClick={() => navigate('/login')}
                  className='px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition'
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className='btn-primary'
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
