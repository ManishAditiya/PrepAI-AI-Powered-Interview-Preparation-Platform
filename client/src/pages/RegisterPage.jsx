import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
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
          <h1 className='text-3xl font-bold gradient-text mb-2'>Get Started</h1>
          <p className='text-gray-600'>Create your PrepAI account today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='card space-y-4'>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-3 text-gray-400' size={20} />
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='input-field pl-10'
                placeholder='John Doe'
                required
              />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 text-gray-400' size={20} />
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='input-field pl-10'
                placeholder='••••••••'
                required
              />
            </div>
          </div>

          {/* Terms */}
          <label className='flex items-start space-x-2 cursor-pointer'>
            <input type='checkbox' className='mt-1' required />
            <span className='text-sm text-gray-600'>
              I agree to the{' '}
              <Link to='/terms' className='text-blue-600 hover:underline'>
                Terms of Service
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='btn-primary w-full flex items-center justify-center space-x-2 mt-6'
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login Link */}
        <p className='text-center mt-6 text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 font-medium hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
