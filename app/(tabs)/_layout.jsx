import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";
import TabBar from "@/components/TabBar";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
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
      {/* <Tabs.Screen
        name="user"
        options={{
          title: "User",
          headerShown: false,
        }}
        /> */}
    </Tabs>
  );
};

export default TabsLayout;

/* tabBarIcon: ({ color }) => (
  <AntDesign name="meho" size={24} color={color} />
), */
