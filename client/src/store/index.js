import { create } from 'zustand';
import { authAPI } from '../api/client';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.message };
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      const { data } = await authAPI.register(userData);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.message };
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.log('Logout error:', error);
    }
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user }),
}));

export const useInterviewStore = create((set) => ({
  interviews: [],
  currentInterview: null,
  loading: false,

  setInterviews: (interviews) => set({ interviews }),
  setCurrentInterview: (interview) => set({ currentInterview: interview }),
  setLoading: (loading) => set({ loading }),

  addInterview: (interview) => set((state) => ({ 
    interviews: [interview, ...state.interviews] 
  })),

  updateInterview: (id, updatedInterview) => set((state) => ({
    interviews: state.interviews.map((i) => (i._id === id ? updatedInterview : i)),
  })),

  deleteInterview: (id) => set((state) => ({
    interviews: state.interviews.filter((i) => i._id !== id),
  })),
}));

export const useResumeStore = create((set) => ({
  resumes: [],
  currentResume: null,
  loading: false,

  setResumes: (resumes) => set({ resumes }),
  setCurrentResume: (resume) => set({ currentResume: resume }),
  setLoading: (loading) => set({ loading }),

  addResume: (resume) => set((state) => ({
    resumes: [resume, ...state.resumes],
  })),

  deleteResume: (id) => set((state) => ({
    resumes: state.resumes.filter((r) => r._id !== id),
  })),
}));

export const useUserStore = create((set) => ({
  profile: null,
  stats: null,
  loading: false,

  setProfile: (profile) => set({ profile }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
}));
