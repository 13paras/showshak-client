import React, { useEffect } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

interface AnimatedSplashScreenProps {
  children: React.ReactNode;
}

export default function AnimatedSplashScreen({
  children,
}: AnimatedSplashScreenProps) {
  const animation = useSharedValue(0);
  const textAnimation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(1, {
      duration: 2000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    textAnimation.value = withDelay(
      1000,
      withTiming(1, {
        duration: 1500,
        easing: Easing.out(Easing.back(1.5)),
      })
    );
  }, []);

  const splashScreenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0, 1], [1, 1]),
  }));

  const splashImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(animation.value, [0, 1], [0.8, 1]),
      },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textAnimation.value,
    transform: [
      {
        translateY: interpolate(textAnimation.value, [0, 1], [-20, 0]),
      },
      {
        scale: interpolate(textAnimation.value, [0, 1], [0.5, 1]),
      },
      {
        rotate: `${interpolate(textAnimation.value, [0, 1], [-10, 0])}deg`,
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.splashScreen,
          splashScreenStyle,
        ]}
      >
        <Animated.Text style={[styles.text, textStyle]}>Showshak</Animated.Text>
        <Animated.Image
          source={require("../assets/images/3splash.png")}
          style={[styles.splashImage, splashImageStyle]}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[styles.content, contentStyle]}>
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    color: "#ffffff",
    fontFamily: "Poppins-Bold",
  },
  content: {
    flex: 1,
  },
});
