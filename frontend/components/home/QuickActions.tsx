import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuickActionsProps {
  onTakePhoto: () => void;
  onPickImage: () => void;
}

export function QuickActions({ onTakePhoto, onPickImage }: QuickActionsProps) {
  return (
    <View className="absolute bottom-24 right-4 space-y-3">
      <TouchableOpacity 
        onPress={onTakePhoto}
        className="bg-white rounded-full w-14 h-14 items-center justify-center shadow-lg mb-3"
        activeOpacity={0.8}
      >
        <Ionicons name="camera" size={24} color="#1a73e8" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={onPickImage}
        className="bg-white rounded-full w-14 h-14 items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Ionicons name="image" size={24} color="#1a73e8" />
      </TouchableOpacity>
    </View>
  );
}
