import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Clipboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "@/services/api/types";
import { formatDecimal, formatDMS, formatDDM } from "@/utils/coordinateFormatter";

interface UserInfoCardProps {
  user: User | null;
  location: any;
  expanded: boolean;
  onToggle: () => void;
}

export function UserInfoCard({ user, location, expanded, onToggle }: UserInfoCardProps) {
  const [coordFormat, setCoordFormat] = useState<'decimal' | 'dms' | 'ddm'>('decimal');
  const getDisplayName = () => {
    if (!user) return "User";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || user.lastName || user.email;
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  };

  const copyCoordinates = () => {
    if (location) {
      let coords: string;
      switch (coordFormat) {
        case 'dms':
          coords = formatDMS(location);
          break;
        case 'ddm':
          coords = formatDDM(location);
          break;
        default:
          coords = formatDecimal(location, 6);
      }
      Clipboard.setString(coords);
      Alert.alert("Đã sao chép", `Tọa độ đã được sao chép:\n${coords}`);
    }
  };

  const toggleCoordFormat = () => {
    setCoordFormat(prev => {
      if (prev === 'decimal') return 'dms';
      if (prev === 'dms') return 'ddm';
      return 'decimal';
    });
  };

  const getFormatLabel = () => {
    switch (coordFormat) {
      case 'dms': return 'DMS (Độ-Phút-Giây)';
      case 'ddm': return 'DDM (Độ-Phút)';
      default: return 'Thập phân';
    }
  };

  const openInMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      Alert.alert(
        "Mở trong Google Maps",
        "Bạn có muốn mở vị trí này trong Google Maps?",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Mở", onPress: () => console.log("Open URL:", url) }
        ]
      );
    }
  };

  return (
    <View className="absolute top-12 left-4 right-4">
      <TouchableOpacity 
        onPress={onToggle}
        className="bg-white rounded-2xl shadow-lg p-4 flex-row items-center"
        activeOpacity={0.8}
      >
        {user?.avatar ? (
          <Image 
            source={{ uri: user.avatar }} 
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-primary-500 items-center justify-center">
            <Text className="text-white font-bold text-lg">{getInitials()}</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <Text className="text-gray-900 font-bold text-base">{getDisplayName()}</Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>{user?.email}</Text>
        </View>
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>

      {expanded && (
        <View className="bg-white rounded-2xl shadow-lg mt-2 p-4">
          {/* Tọa độ */}
          <View className="mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Ionicons name="location" size={20} color="#1a73e8" />
                <Text className="ml-2 text-gray-900 font-semibold">Vị trí hiện tại</Text>
              </View>
              <TouchableOpacity
                onPress={toggleCoordFormat}
                className="bg-primary-50 px-3 py-1 rounded-full"
                activeOpacity={0.7}
              >
                <Text className="text-primary-600 text-xs font-semibold">{getFormatLabel()}</Text>
              </TouchableOpacity>
            </View>
            {location ? (
              <View className="ml-7 bg-gray-50 rounded-lg p-3">
                {coordFormat === 'decimal' && (
                  <>
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-600 text-sm">Vĩ độ (Latitude):</Text>
                      <Text className="text-gray-900 font-mono text-sm font-semibold">
                        {location.latitude.toFixed(6)}°
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600 text-sm">Kinh độ (Longitude):</Text>
                      <Text className="text-gray-900 font-mono text-sm font-semibold">
                        {location.longitude.toFixed(6)}°
                      </Text>
                    </View>
                  </>
                )}
                {coordFormat === 'dms' && (
                  <View>
                    <Text className="text-gray-900 font-mono text-sm font-semibold text-center">
                      {formatDMS(location)}
                    </Text>
                    <Text className="text-gray-500 text-xs text-center mt-1">
                      Độ-Phút-Giây (DMS)
                    </Text>
                  </View>
                )}
                {coordFormat === 'ddm' && (
                  <View>
                    <Text className="text-gray-900 font-mono text-sm font-semibold text-center">
                      {formatDDM(location)}
                    </Text>
                    <Text className="text-gray-500 text-xs text-center mt-1">
                      Độ-Phút thập phân (DDM)
                    </Text>
                  </View>
                )}
                {location.altitude && (
                  <View className="flex-row justify-between mt-1 pt-1 border-t border-gray-200">
                    <Text className="text-gray-600 text-sm">Độ cao:</Text>
                    <Text className="text-gray-900 font-mono text-sm font-semibold">
                      {location.altitude.toFixed(1)}m
                    </Text>
                  </View>
                )}
                {location.accuracy && (
                  <View className="flex-row justify-between mt-1">
                    <Text className="text-gray-600 text-sm">Độ chính xác:</Text>
                    <Text className="text-gray-900 font-mono text-sm font-semibold">
                      ±{location.accuracy.toFixed(0)}m
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <Text className="ml-7 text-gray-500 text-sm">Đang tải...</Text>
            )}
          </View>

          {/* Action buttons */}
          {location && (
            <View className="flex-row gap-2 mb-3">
              <TouchableOpacity
                onPress={copyCoordinates}
                className="flex-1 bg-primary-50 rounded-lg p-3 flex-row items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="copy-outline" size={18} color="#1a73e8" />
                <Text className="ml-2 text-primary-600 font-semibold text-sm">Sao chép</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={openInMaps}
                className="flex-1 bg-primary-50 rounded-lg p-3 flex-row items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="map-outline" size={18} color="#1a73e8" />
                <Text className="ml-2 text-primary-600 font-semibold text-sm">Mở Maps</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Thời gian */}
          <View className="flex-row items-center pt-3 border-t border-gray-100">
            <Ionicons name="time" size={20} color="#1a73e8" />
            <Text className="ml-2 text-gray-700 text-sm">
              {new Date().toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
