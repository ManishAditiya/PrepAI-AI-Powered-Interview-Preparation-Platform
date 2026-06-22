import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Hero Text */}
        <div className='text-center mb-8'>
          <div className='inline-block mb-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center'>
              <span className='text-3xl font-bold text-white'>PA</span>
            </div>
          </div>
          <h1 className='text-3xl font-bold gradient-text mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Login to your PrepAI account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='card space-y-6'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 text-gray-400' size={20} />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='input-field pl-10'
                placeholder='you@example.com'
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 text-gray-400' size={20} />
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='input-field pl-10'
                placeholder='••••••••'
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input type='checkbox' className='rounded' />
              <span className='text-gray-600'>Remember me</span>
            </label>
            <Link to='/forgot-password' className='text-blue-600 hover:underline'>
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='btn-primary w-full flex items-center justify-center space-x-2'
          >
            <span>{loading ? 'Logging in...' : 'Login'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Sign Up Link */}
        <p className='text-center mt-6 text-gray-600'>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-600 font-medium hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
