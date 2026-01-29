import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { router } from "expo-router";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { UserService } from "@/services/user";
import { authService } from "@/services/auth";
import type { User } from "@/services/api/types";
import { UserInfoCard } from "@/components/home/UserInfoCard";
import { QuickActions } from "@/components/home/QuickActions";
import { CustomMarker } from "@/components/home/CustomMarker";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUserCard, setShowUserCard] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      // 1. Lấy dữ liệu user từ AsyncStorage
      const userData = await UserService.getUser();
      if (userData) {
        setUser(userData);
      }

      // 2. Lấy vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Thông báo", "Quyền truy cập vị trí bị từ chối");
        setLoading(false);
        return;
      }
      
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      console.error("Error initializing data:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: async () => {
            try {
              await authService.logout();
              router.replace("/login");
            } catch (error) {
              console.error("Logout error:", error);
              router.replace("/login");
            }
          }
        }
      ]
    );
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Thông báo", "Cần quyền truy cập thư viện ảnh!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        Alert.alert("Thành công", "Đã chọn ảnh! (Chức năng upload đang phát triển)");
        console.log("Selected image:", imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Lỗi", "Không thể chọn ảnh");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Thông báo", "Cần quyền truy cập camera!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        Alert.alert("Thành công", "Đã chụp ảnh! (Chức năng upload đang phát triển)");
        console.log("Captured image:", imageUri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Lỗi", "Không thể chụp ảnh");
    }
  };

  const getDisplayName = () => {
    if (!user) return "User";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || user.lastName || user.email;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text className="mt-4 text-gray-600 text-base font-medium">Đang tải bản đồ...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Map Container - MUST use StyleSheet for MapView */}
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 15.87,
            longitude: location?.longitude || 108.335,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={getDisplayName()}
              description={user?.email}
            >
              <CustomMarker user={user} />
            </Marker>
          )}
        </MapView>

        {/* User Info Card */}
        <UserInfoCard 
          user={user}
          location={location}
          expanded={showUserCard}
          onToggle={() => setShowUserCard(!showUserCard)}
        />

        {/* Quick Action Buttons */}
        <QuickActions 
          onTakePhoto={handleTakePhoto}
          onPickImage={handlePickImage}
        />

        {/* FAB Menu */}
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "close" : "menu"}
            actions={[
              {
                icon: "account-multiple-plus",
                label: "Thêm bạn bè",
                onPress: () => Alert.alert("Thông báo", "Chức năng đang phát triển"),
                color: "#1a73e8",
                style: { backgroundColor: "#ffffff" },
              },
              {
                icon: "map-marker-radius",
                label: "Chia sẻ vị trí",
                onPress: () => Alert.alert("Vị trí", `Lat: ${location?.latitude.toFixed(4)}\nLng: ${location?.longitude.toFixed(4)}`),
                color: "#1a73e8",
                style: { backgroundColor: "#ffffff" },
              },
              {
                icon: "refresh",
                label: "Làm mới",
                onPress: initData,
                color: "#1a73e8",
                style: { backgroundColor: "#ffffff" },
              },
              {
                icon: "logout",
                label: "Đăng xuất",
                onPress: handleLogout,
                color: "#dc2626",
                style: { backgroundColor: "#ffffff" },
              },
            ]}
            onStateChange={({ open }) => setOpen(open)}
            fabStyle={{ backgroundColor: "#1a73e8" }}
            color="#ffffff"
          />
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
