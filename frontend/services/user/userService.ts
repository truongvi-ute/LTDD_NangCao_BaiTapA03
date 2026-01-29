import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "@/services/api/types";

const USER_STORAGE_KEY = "@user_data";

export class UserService {
  /**
   * Lưu thông tin user vào AsyncStorage
   */
  static async saveUser(userData: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  /**
   * Lấy thông tin user từ AsyncStorage
   */
  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  /**
   * Xóa thông tin user (dùng khi logout)
   */
  static async clearUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing user data:", error);
      throw error;
    }
  }

  /**
   * Cập nhật một phần thông tin user
   */
  static async updateUser(updates: Partial<User>): Promise<void> {
    try {
      const currentUser = await this.getUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        await this.saveUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }
}
