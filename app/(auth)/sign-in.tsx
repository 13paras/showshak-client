import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Checkbox } from "react-native-paper";
import { useLoginMutation } from "@/redux/api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Spinner from "@/components/Spinner";

const SignIn = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfo =
          (await AsyncStorage.getItem("jwt")) && AsyncStorage.getItem("userId");

        if (userInfo) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

  const loginHandler = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (!checked) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return;
    }
    try {
      console.log("Login clickeddd!!!");
      const result = await login({
        email: form.email,
        password: form.password,
      }).unwrap(); // Make sure to unwrap the response

      // console.log("Result: ", result);

      if (result.error) {
        console.log("Try error: ", result);
        Alert.alert(
          "Error",
          result.data.message || "An error occurred during login"
        );
        return;
      }

      await AsyncStorage.setItem("jwt", result.token);

      dispatch(setUser({ ...result.data }));

      Alert.alert("Success", "User signed in successfully");
      router.replace("/(tabs)/home");
    } catch (error: Error | any) {
      Alert.alert(
        "Error",
        error.data.message || "An error occurred during login"
      );
      console.log(error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <SafeAreaView className="bg-blue-100 h-full">
      <ScrollView>
        <View className=" w-full justify-center min-h-[85vh] px-4 py-6">
          <View className=" space-y-4">
            <Text className="text-3xl text-center text-black font-psemibold">
              Login
            </Text>

            <View className="w-full px-4 ">
              <FormField
                title="Email"
                handleChangeText={(e) => setForm({ ...form, email: e })}
                value={form.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <FormField
                title="Password"
                handleChangeText={(e) => setForm({ ...form, password: e })}
                value={form.password}
                placeholder="Password"
              />
            </View>

            <CustomButton
              title="Continue"
              handlePress={loginHandler}
              containerStyles="bg-blue-600"
            />
          </View>

          {/* <Divider className="my-6" /> */}
          {/* <View className={`flex-row items-center my-7`}>
            <View className={`flex-1 border-0.5 border-zinc-600`} />
            <Text className={`mx-2 text-zinc-600`}>OR</Text>
            <View className={`flex-1 border-0.5 border-zinc-600`} />
          </View> */}

          {/* <View className="mx-4">

            <TouchableOpacity
              onPress={googleLoginHandler}
              className="bg-white shadow-sm w-[91%] mx-auto flex-row rounded-full flex items-center justify-center min-h-[50px]"
            >
              <Image source={images.googleIcon} className="h-8 w-8" />
              <Text className="text-black font-psemibold ml-2">
                Sign in with google
              </Text>
            </TouchableOpacity>
          </View> */}

          <View className="flex mt-4 items-center justify-center flex-row">
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              color="blue"
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Accept terms and conditions</Text>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className=" text-black font-pregular">
              Don't have account ?
            </Text>
            <Link href={"/sign-up"} className=" font-psemibold text-blue-500">
              {" "}
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

{
  /* <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
        className="h-[225] w-[90]"
        source={require("@/assets/images/light.png")}
      /> */
}
