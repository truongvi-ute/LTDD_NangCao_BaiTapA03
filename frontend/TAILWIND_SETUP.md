# Tailwind CSS Setup - NativeWind

## 📦 Đã cài đặt

```bash
npm install nativewind tailwindcss --save-dev
```

## ⚙️ Cấu hình

### 1. tailwind.config.js
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#1a73e8",
          // ... more shades
        },
      },
    },
  },
};
```

### 2. babel.config.js
```javascript
module.exports = {
  presets: [
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],
};
```

### 3. metro.config.js
```javascript
const { withNativeWind } = require("nativewind/metro");
module.exports = withNativeWind(config, { input: "./global.css" });
```

### 4. global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. _layout.tsx
```typescript
import "../global.css";
```

## 🎨 Sử dụng Tailwind Classes

### Basic Styling
```tsx
<View className="flex-1 bg-white">
  <Text className="text-lg font-bold text-gray-900">Hello</Text>
</View>
```

### Responsive & States
```tsx
<TouchableOpacity 
  className="bg-primary-500 p-4 rounded-lg active:bg-primary-600"
  activeOpacity={0.8}
>
  <Text className="text-white font-semibold">Button</Text>
</TouchableOpacity>
```

### Custom Colors
```tsx
<View className="bg-primary-500">
  <Text className="text-primary-50">Text</Text>
</View>
```

## 🏗️ Component Structure

### Home Screen Components
- `UserInfoCard.tsx` - Card hiển thị thông tin user
- `QuickActions.tsx` - Nút action nhanh (camera, gallery)
- `CustomMarker.tsx` - Marker tùy chỉnh trên map

### Styling Approach
- Sử dụng Tailwind classes cho layout và spacing
- StyleSheet cho các style phức tạp (MapView)
- Kết hợp với React Native Paper cho FAB

## 🎯 Best Practices

1. **Consistent Spacing**: Sử dụng scale của Tailwind (p-4, m-2, gap-3)
2. **Color Palette**: Dùng primary/secondary colors đã định nghĩa
3. **Shadows**: `shadow-lg`, `shadow-md` cho depth
4. **Rounded Corners**: `rounded-2xl`, `rounded-full` cho modern look
5. **Typography**: `text-base`, `font-bold`, `text-gray-900`

## 🔄 Hot Reload

Sau khi thay đổi Tailwind config:
```bash
# Clear cache
npx expo start -c
```

## 📱 Platform Specific

NativeWind tự động xử lý platform differences:
- iOS: Native shadows
- Android: Elevation
- Web: CSS shadows

## 🐛 Troubleshooting

### Classes không hoạt động
1. Kiểm tra `content` paths trong tailwind.config.js
2. Restart Metro bundler: `npx expo start -c`
3. Kiểm tra import `global.css` trong _layout.tsx

### TypeScript errors
Thêm vào `expo-env.d.ts`:
```typescript
/// <reference types="nativewind/types" />
```

## 🎨 Color Palette

### Primary (Blue)
- `primary-50` to `primary-900`
- Main: `primary-500` (#1a73e8)

### Secondary (Light Blue)
- `secondary-50` to `secondary-900`
- Main: `secondary-500` (#0ea5e9)

### Grays
- `gray-50` to `gray-900`
- Text: `gray-900`, `gray-700`, `gray-500`

## 📚 Resources

- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Expo + NativeWind](https://docs.expo.dev/guides/using-nativewind/)
