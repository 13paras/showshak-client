import { View, Text, Platform, Linking } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const user = () => {
  useEffect(() => {
    const makePhoneCall = () => {
      if (Platform.OS === "android") {
        Linking.openURL("tel: +1804-206-5106");
      } else {
        Linking.openURL("telprompt: +1804-206-5106");
      }
    };
    // makePhoneCall();
  }, []);
  return (
    <SafeAreaView>
      <Text>user</Text>
    </SafeAreaView>
  );
};

export default user;
