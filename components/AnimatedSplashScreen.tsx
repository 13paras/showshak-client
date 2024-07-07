import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

interface AnimatedSplashScreenProps {
  children: React.ReactNode;
}

export default function AnimatedSplashScreen({
  children,
}: AnimatedSplashScreenProps) {
  const animation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.splashScreen,
          {
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1],
            }),
          },
        ]}
      >
        <Animated.Image
          source={require("../assets/images/showshak334.png")}
          style={[
            styles.splashImage,
            {
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: textAnimation,
              transform: [
                {
                  translateY: textAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Showshak
        </Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.content, { opacity: animation }]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreen: {
    flex: 1,
    backgroundColor: "#092b99",
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: width * 0.5,
    height: height * 0.5,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    color: "#ffffff", 
    fontFamily: "Poppins-Bold", 
  },
  content: {
    flex: 1,
  },
});
