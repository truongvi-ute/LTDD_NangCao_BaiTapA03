import { create } from 'zustand';
import { User } from '../services/api/types';
import { apiClient } from '../services/api/client';
import { API_ENDPOINTS } from '../services/api/endpoints';

interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setProfile: (profile: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set, get) => ({
  // Initial state
  profile: null,
  isLoading: false,
  error: null,

  // Actions
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await apiClient.get<User>(API_ENDPOINTS.USER.PROFILE);
      set({
        profile,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch profile',
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProfile = await apiClient.put<User>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        data
      );
      set({
        profile: updatedProfile,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update profile',
        isLoading: false,
      });
      throw error;
    }
  },

  setProfile: (profile) => {
    set({ profile });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));