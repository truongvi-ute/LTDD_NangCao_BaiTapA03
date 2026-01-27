import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { LoginRequest, RegisterRequest, AuthResponse } from '../api/types';
import { setToken, removeToken } from './tokenService';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      // Store token after successful login
      await setToken(response.token);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      // Store token after successful registration
      await setToken(response.token);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always remove token from storage
      await removeToken();
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  async verifyOTP(email: string, otp: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      email,
      otp,
      newPassword,
    });
  }
}

export const authService = new AuthService();