# BÁO CÁO: TRANG HOME - CÔNG NGHỆ VÀ TRIỂN KHAI

## 📋 TỔNG QUAN

Trang Home là màn hình chính của ứng dụng, hiển thị bản đồ với vị trí người dùng và các tính năng tương tác.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

### 1. Framework & Core Libraries

#### React Native (v0.81.5)
- **Mục đích**: Framework chính để xây dựng ứng dụng mobile đa nền tảng
- **Cài đặt**: Đã có sẵn với Expo
```bash
# Không cần cài riêng, đi kèm với expo
```

#### Expo SDK (~54.0.32)
- **Mục đích**: Platform để phát triển React Native app dễ dàng hơn
- **Cài đặt**: 
```bash
npm install expo
```

#### TypeScript (~5.9.2)
- **Mục đích**: Type safety, giảm lỗi runtime
- **Cài đặt**:
```bash
npm install --save-dev typescript @types/react
```

---

### 2. Navigation & Routing

#### Expo Router (~6.0.22)
- **Mục đích**: File-based routing, điều hướng giữa các màn hình
- **Cài đặt**:
```bash
npm install expo-router
```
- **Sử dụng trong Home**:
```typescript
import { router } from "expo-router";
router.replace("/login"); // Chuyển màn hình
```

---

### 3. Maps & Location

#### React Native Maps (1.20.1)
- **Mục đích**: Hiển thị bản đồ, markers, vị trí người dùng
- **Cài đặt**:
```bash
npm install react-native-maps
```
- **Sử dụng**:
```typescript
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

<MapView
  provider={PROVIDER_DEFAULT}
  style={StyleSheet.absoluteFillObject}
  initialRegion={{
    latitude: 15.87,
    longitude: 108.335,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  showsUserLocation={true}
/>
```

#### Expo Location (~19.0.8)
- **Mục đích**: Lấy vị trí GPS của người dùng
- **Cài đặt**:
```bash
npm install expo-location
```
- **Sử dụng**:
```typescript
import * as Location from "expo-location";

// Xin quyền
const { status } = await Location.requestForegroundPermissionsAsync();

// Lấy vị trí
const location = await Location.getCurrentPositionAsync({});
console.log(location.coords.latitude, location.coords.longitude);
```

---

### 4. UI Components & Styling

#### React Native Paper (^5.14.5)
- **Mục đích**: Material Design components (FAB, Portal)
- **Cài đặt**:
```bash
npm install react-native-paper
```
- **Sử dụng**:
```typescript
import { FAB, Portal, PaperProvider } from "react-native-paper";

<PaperProvider>
  <Portal>
    <FAB.Group
      open={open}
      icon="menu"
      actions={[...]}
    />
  </Portal>
</PaperProvider>
```

#### NativeWind (Tailwind CSS)
- **Mục đích**: Utility-first CSS styling cho React Native
- **Cài đặt**:
```bash
npm install nativewind
npm install --save-dev tailwindcss
npx tailwindcss init
```
- **Cấu hình**: Xem file `tailwind.config.js`, `babel.config.js`, `metro.config.js`
- **Sử dụng**:
```typescript
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-bold text-gray-900">Hello</Text>
</View>
```

#### Expo Vector Icons (^15.0.3)
- **Mục đích**: Icon library (Ionicons, MaterialIcons, etc.)
- **Cài đặt**:
```bash
npm install @expo/vector-icons
```
- **Sử dụng**:
```typescript
import { Ionicons } from "@expo/vector-icons";
<Ionicons name="location" size={24} color="#1a73e8" />
```

---

### 5. Image & Media

#### Expo Image Picker (~15.0.8)
- **Mục đích**: Chọn ảnh từ thư viện hoặc chụp ảnh từ camera
- **Cài đặt**:
```bash
npm install expo-image-picker
```
- **Sử dụng**:
```typescript
import * as ImagePicker from "expo-image-picker";

// Chọn từ thư viện
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
});

// Chụp ảnh
const result = await ImagePicker.launchCameraAsync({
  allowsEditing: true,
  quality: 0.8,
});
```

---

### 6. State Management & Storage

#### AsyncStorage (@react-native-async-storage/async-storage ^2.2.0)
- **Mục đích**: Lưu trữ dữ liệu local (user info, settings)
- **Cài đặt**:
```bash
npm install @react-native-async-storage/async-storage
```
- **Sử dụng**:
```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu
await AsyncStorage.setItem("@user_data", JSON.stringify(userData));

// Đọc
const data = await AsyncStorage.getItem("@user_data");
const user = JSON.parse(data);
```

#### Expo SecureStore (~15.0.8)
- **Mục đích**: Lưu trữ bảo mật (tokens, passwords)
- **Cài đặt**:
```bash
npm install expo-secure-store
```
- **Sử dụng**:
```typescript
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("token", jwtToken);
const token = await SecureStore.getItemAsync("token");
```

---

### 7. HTTP Client

#### Axios (^1.13.3)
- **Mục đích**: HTTP requests đến backend API
- **Cài đặt**:
```bash
npm install axios
```
- **Sử dụng**:
```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

const response = await apiClient.get("/user/profile");
```

---

## 📁 CẤU TRÚC COMPONENTS

### Home Screen Components

```
app/home.tsx                          # Main screen
├── components/home/
│   ├── UserInfoCard.tsx             # Card hiển thị thông tin user
│   ├── QuickActions.tsx             # Nút camera & gallery
│   └── CustomMarker.tsx             # Marker tùy chỉnh trên map
├── services/
│   ├── user/userService.ts          # User data management
│   ├── auth/authService.ts          # Authentication
│   └── upload/uploadService.ts      # Image upload
└── utils/
    └── coordinateFormatter.ts        # Format tọa độ
```

---

## 🔧 CÁCH CÀI ĐẶT ĐẦY ĐỦ

### Bước 1: Khởi tạo project (Nếu chưa có)
```bash
npx create-expo-app@latest frontend
cd frontend
```

### Bước 2: Cài đặt dependencies chính
```bash
# Navigation
npm install expo-router

# Maps & Location
npm install react-native-maps
npm install expo-location

# UI Components
npm install react-native-paper
npm install @expo/vector-icons

# Styling
npm install nativewind
npm install --save-dev tailwindcss

# Image Picker
npm install expo-image-picker

# Storage
npm install @react-native-async-storage/async-storage
npm install expo-secure-store

# HTTP Client
npm install axios

# TypeScript
npm install --save-dev typescript @types/react
```

### Bước 3: Cấu hình Tailwind CSS
```bash
# Tạo config
npx tailwindcss init

# Tạo các file cấu hình
# - tailwind.config.js
# - babel.config.js
# - metro.config.js
# - global.css
```

### Bước 4: Cấu hình app.json
```json
{
  "expo": {
    "plugins": [
      "expo-router",
      "expo-secure-store"
    ],
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

### Bước 5: Chạy ứng dụng
```bash
# Development
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios

# Clear cache nếu cần
npx expo start -c
```

---

## 📊 TÍNH NĂNG TRANG HOME

### 1. Hiển thị bản đồ
- ✅ React Native Maps với PROVIDER_DEFAULT
- ✅ Hiển thị vị trí người dùng realtime
- ✅ Custom marker với avatar/initials
- ✅ Zoom, pan, compass controls

### 2. Thông tin người dùng
- ✅ Card có thể expand/collapse
- ✅ Hiển thị avatar, tên, email
- ✅ Tọa độ với 3 định dạng (Decimal, DMS, DDM)
- ✅ Độ cao, độ chính xác GPS
- ✅ Timestamp

### 3. Tương tác
- ✅ Sao chép tọa độ
- ✅ Mở trong Google Maps
- ✅ Chuyển đổi định dạng tọa độ
- ✅ Chụp ảnh từ camera
- ✅ Chọn ảnh từ thư viện
- ✅ FAB menu với 4 actions

### 4. State Management
- ✅ User data từ AsyncStorage
- ✅ Token từ SecureStore
- ✅ Location state với useState
- ✅ Loading states

---

## 🎨 STYLING APPROACH

### Hybrid Approach
```typescript
// Tailwind cho UI components
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-bold">Title</Text>
</View>

// StyleSheet cho MapView (bắt buộc)
<MapView style={StyleSheet.absoluteFillObject} />

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
```

### Color Palette
```javascript
// tailwind.config.js
colors: {
  primary: {
    500: "#1a73e8",  // Main blue
    600: "#155cba",
  },
  gray: {
    50: "#f9fafb",
    900: "#111827",
  },
}
```

---

## 🔐 PERMISSIONS

### Android (app.json)
```json
"permissions": [
  "ACCESS_FINE_LOCATION",
  "ACCESS_COARSE_LOCATION",
  "CAMERA",
  "READ_EXTERNAL_STORAGE",
  "WRITE_EXTERNAL_STORAGE"
]
```

### iOS (app.json)
```json
"infoPlist": {
  "NSLocationWhenInUseUsageDescription": "Cần quyền vị trí để hiển thị trên bản đồ",
  "NSCameraUsageDescription": "Cần quyền camera để chụp ảnh",
  "NSPhotoLibraryUsageDescription": "Cần quyền thư viện để chọn ảnh"
}
```

---

## 📈 PERFORMANCE OPTIMIZATION

### 1. Lazy Loading
```typescript
// Load components khi cần
const [showUserCard, setShowUserCard] = useState(false);
```

### 2. Memoization
```typescript
// Tránh re-render không cần thiết
const getDisplayName = useMemo(() => {
  // logic
}, [user]);
```

### 3. Image Optimization
```typescript
// Compress ảnh trước khi upload
quality: 0.8,
allowsEditing: true,
```

---

## 🐛 TROUBLESHOOTING

### Bản đồ không hiển thị
- ✅ Dùng StyleSheet thay vì className cho MapView
- ✅ Dùng PROVIDER_DEFAULT thay vì PROVIDER_GOOGLE
- ✅ Kiểm tra permissions

### Tailwind không hoạt động
```bash
npx expo start -c  # Clear cache
```

### Location không lấy được
- ✅ Kiểm tra permissions trong app.json
- ✅ Test trên device thật (emulator có thể không có GPS)

---

## 📚 TÀI LIỆU THAM KHẢO

1. **Expo Documentation**: https://docs.expo.dev/
2. **React Native Maps**: https://github.com/react-native-maps/react-native-maps
3. **NativeWind**: https://www.nativewind.dev/
4. **React Native Paper**: https://callstack.github.io/react-native-paper/
5. **Expo Location**: https://docs.expo.dev/versions/latest/sdk/location/
6. **Expo Image Picker**: https://docs.expo.dev/versions/latest/sdk/imagepicker/

---

## 📝 KẾT LUẬN

Trang Home sử dụng tổng cộng **15+ thư viện** chính, kết hợp giữa:
- **React Native ecosystem** (core, maps, paper)
- **Expo SDK** (location, image picker, secure store)
- **Modern tooling** (TypeScript, NativeWind)
- **Best practices** (component composition, service layer, type safety)

Tất cả được tích hợp để tạo ra một trang home chuyên nghiệp với đầy đủ tính năng maps, location tracking, và media handling.
