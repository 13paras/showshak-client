import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

const Chat = () => {
  const [loading, setLoading] = useState(true);

  // use effect for showing spinner

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 mt-12 pb-28">
      {loading ? (
        <Spinner />
      ) : (
        <WebView
          className="h-full"
          source={{
            uri: process.env.EXPO_PUBLIC_TAWK_URL as string,
          }}
        />
      )}
    </View>
  );
};

export default Chat;
