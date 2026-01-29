import { apiClient } from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export class UploadService {
  /**
   * Upload ảnh lên server
   * @param imageUri - URI của ảnh từ ImagePicker
   * @param type - Loại upload: 'avatar' | 'post' | 'location'
   */
  static async uploadImage(
    imageUri: string,
    type: "avatar" | "post" | "location" = "post"
  ): Promise<{ url: string }> {
    try {
      // Tạo FormData
      const formData = new FormData();
      
      // Lấy tên file và extension
      const filename = imageUri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : "image/jpeg";

      // Append file vào FormData
      formData.append("file", {
        uri: imageUri,
        name: filename,
        type: fileType,
      } as any);

      formData.append("type", type);

      // Upload lên server
      const response = await apiClient.post<{ url: string }>(
        API_ENDPOINTS.UPLOAD.IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }

  /**
   * Upload avatar và cập nhật profile
   */
  static async uploadAvatar(imageUri: string): Promise<{ url: string }> {
    try {
      const result = await this.uploadImage(imageUri, "avatar");
      
      // TODO: Cập nhật avatar trong user profile
      // await apiClient.patch(API_ENDPOINTS.USER.UPDATE_PROFILE, {
      //   avatar: result.url
      // });

      return result;
    } catch (error) {
      console.error("Upload avatar error:", error);
      throw error;
    }
  }
}
