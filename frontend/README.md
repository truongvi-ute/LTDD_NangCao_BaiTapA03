# Frontend - React Native Expo App

## 📁 Cấu trúc thư mục

```
frontend/
├── app/                    # Expo Router - Screens & Navigation
│   ├── index.tsx          # Landing/Welcome screen
│   ├── login.tsx          # Login screen
│   ├── register.tsx       # Register screen
│   ├── forgot-password.tsx # Forgot password screen
│   ├── verify-otp.tsx     # OTP verification screen
│   ├── home.tsx           # Home screen
│   └── _layout.tsx        # Root layout
├── assets/                # Static assets
│   └── images/           # Images, icons
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   └── *.tsx            # Feature components
├── constants/           # App constants
│   ├── api.js          # API constants
│   └── theme.ts        # Theme constants
├── hooks/              # Custom React hooks
├── services/           # Business logic & API calls
│   ├── api/           # API client & endpoints
│   ├── auth/          # Authentication services
│   ├── user/          # User data management
│   └── storage/       # Storage services
├── store/             # State management (Zustand)
│   ├── authStore.ts   # Authentication state
│   └── userStore.ts   # User profile state
├── types/             # TypeScript type definitions
│   ├── navigation.ts  # Navigation types
│   └── common.ts      # Common types
└── utils/             # Utility functions
```

## 🏗️ Kiến trúc

### Hybrid Architecture
- **Expo Router**: File-based routing (modern approach)
- **Zustand**: State management (lightweight alternative to Redux)
- **Services Layer**: API calls và business logic
- **Component-based**: Reusable UI components

### Tech Stack
- **Framework**: Expo + React Native
- **Navigation**: Expo Router
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Storage**: Expo SecureStore + AsyncStorage
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **TypeScript**: Full type safety

## 🚀 Cách sử dụng

### Services
```typescript
// Authentication
import { authService } from '@/services/auth';
await authService.login({ email, password });

// API calls
import { apiClient } from '@/services/api';
const data = await apiClient.get('/endpoint');

// User Data Management
import { UserService } from '@/services/user';
const user = await UserService.getUser();
await UserService.saveUser(userData);
```

### State Management
```typescript
// Auth store
import { useAuthStore } from '@/store/authStore';
const { user, login, logout } = useAuthStore();

// User store
import { useUserStore } from '@/store/userStore';
const { profile, fetchProfile } = useUserStore();
```

### Navigation
```typescript
// Expo Router navigation
import { router } from 'expo-router';
router.push('/login');
router.replace('/home');
```

## 📦 Dependencies

### Core
- `expo-router`: File-based navigation
- `zustand`: State management
- `axios`: HTTP client
- `expo-secure-store`: Secure token storage
- `@react-native-async-storage/async-storage`: Local storage

### Development
- `typescript`: Type safety
- `eslint`: Code linting
- `nativewind`: Tailwind CSS for React Native
- `tailwindcss`: Utility-first CSS framework

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

### API Configuration
Update `services/api/client.ts` for your backend URL and authentication flow.

## 📱 Screens

- **index.tsx**: Landing/Welcome screen
- **login.tsx**: User authentication
- **register.tsx**: User registration
- **forgot-password.tsx**: Password recovery
- **verify-otp.tsx**: OTP verification
- **home.tsx**: Main app screen

## 🎯 Best Practices

1. **Services**: Tách biệt API logic khỏi UI components
2. **State Management**: Sử dụng Zustand stores cho global state
3. **Types**: Định nghĩa TypeScript types cho type safety
4. **Error Handling**: Centralized error handling trong API client
5. **Security**: Sử dụng SecureStore cho sensitive data
6. **Styling**: Sử dụng NativeWind (Tailwind CSS) cho consistent UI

## 🎨 Styling với NativeWind

```tsx
// Tailwind classes
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-bold text-gray-900">Hello</Text>
  <TouchableOpacity className="bg-primary-500 rounded-lg p-3">
    <Text className="text-white">Button</Text>
  </TouchableOpacity>
</View>
```

Xem thêm: [TAILWIND_SETUP.md](./TAILWIND_SETUP.md)

## 🔄 Migration Notes

Cấu trúc này kết hợp:
- ✅ **Expo Router** (modern, file-based routing)
- ✅ **Services layer** (API & business logic)
- ✅ **State management** (Zustand)
- ✅ **Type safety** (TypeScript)

Đây là cấu trúc hybrid tối ưu cho React Native apps hiện đại.