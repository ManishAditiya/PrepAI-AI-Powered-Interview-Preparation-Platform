import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InterviewsPage from './pages/InterviewsPage';
import NewInterviewPage from './pages/NewInterviewPage';
import InterviewPage from './pages/InterviewPage';
import FeedbackPage from './pages/FeedbackPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route
              path='/login'
              element={isAuthenticated ? <Navigate to='/dashboard' /> : <LoginPage />}
            />
            <Route
              path='/register'
              element={isAuthenticated ? <Navigate to='/dashboard' /> : <RegisterPage />}
            />

            {/* Protected Routes */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/interviews'
              element={
                <ProtectedRoute>
                  <InterviewsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/new-interview'
              element={
                <ProtectedRoute>
                  <NewInterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/interview/:id'
              element={
                <ProtectedRoute>
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/interview/:id/feedback'
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Redirect */}
            <Route 
              path='/' 
              element={isAuthenticated ? <Navigate to='/dashboard' /> : <LandingPage />} 
            />
            <Route path='*' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to='/' />} />
          </Routes>
        </main>

        {/* Toast notifications */}
        <Toaster position='top-right' />
      </div>
    </Router>
  );
}

export default App;
