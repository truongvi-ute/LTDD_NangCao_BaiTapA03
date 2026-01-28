import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { FAB, Portal, PaperProvider, Avatar, Text } from "react-native-paper";
import { router } from "expo-router";
import * as Location from "expo-location";
import { TokenManager } from "../utils/tokenManager";

const HomeScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 1. Lấy dữ liệu user (từ Realm hoặc TokenManager)
    const loadUserData = async () => {
      const userData = await TokenManager.getUser();
      setUser(userData);
    };

    // 2. Lấy vị trí hiện tại
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Thông báo", "Quyền truy cập vị trí bị từ chối");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    loadUserData();
    getLocation();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Bản đồ hiển thị vị trí Việt Nam/Cá nhân */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 15.87, // Tọa độ trung tâm Việt Nam
            longitude: 108.335,
            latitudeDelta: 12,
            longitudeDelta: 12,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Vị trí của bạn"
            />
          )}
        </MapView>

        {/* Nút chức năng hình tròn góc dưới bên phải */}
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "chevron-down" : "plus"}
            actions={[
              {
                icon: "account-multiple-plus",
                label: "Thêm bạn bè",
                onPress: () => {},
              },
              {
                icon: "camera-plus",
                label: "Thêm hình ảnh",
                onPress: () => {},
              },
              { icon: "account-circle", label: "Profile", onPress: () => {} },
              {
                icon: "logout",
                label: "Đăng xuất",
                onPress: async () => {
                  await TokenManager.removeToken();
                  router.replace("/login");
                },
              },
            ]}
            onStateChange={({ open }) => setOpen(open)}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
});

export default HomeScreen;
