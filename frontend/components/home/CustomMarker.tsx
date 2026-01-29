import React from "react";
import { View, Text, Image } from "react-native";
import type { User } from "@/services/api/types";

interface CustomMarkerProps {
  user: User | null;
}

export function CustomMarker({ user }: CustomMarkerProps) {
  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  };

  return (
    <View className="items-center">
      {user?.avatar ? (
        <Image 
          source={{ uri: user.avatar }} 
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-primary-500 items-center justify-center border-2 border-white shadow-lg">
          <Text className="text-white font-bold text-lg">{getInitials()}</Text>
        </View>
      )}
    </View>
  );
}
