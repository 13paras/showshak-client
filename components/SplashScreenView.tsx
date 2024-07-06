import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

const SplashScreenView = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#1e1e1e] space-y-10">
      {/* Element 1 */}
      <View className="animate-slidein">
        <Text className="text-3xl font-pbold text-blue-300">Showshak</Text>
      </View>

      <View className="animate-slidein">
        <Image
          src={images.showshakLogo}
          className="w-[70%]"
          style={{
            maxWidth: 400,
          }}
        />
      </View>
    </View>
  );
};

export default SplashScreenView;
