import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";
import { Linking, Platform } from "react-native";

const TabsLayout = () => {
  const makePhoneCall = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel: +1804-206-5106");
    } else {
      Linking.openURL("telprompt: +1804-206-5106");
    }
  };

  return (
    <Tabs tabBar={(props) => <TabBar {...props} makePhoneCall={makePhoneCall} />}>
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          /* 
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ), */
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          /* tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ), */
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

/* tabBarIcon: ({ color }) => (
  <AntDesign name="meho" size={24} color={color} />
), */
