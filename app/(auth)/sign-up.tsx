import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Checkbox, useTheme } from "react-native-paper";
import { useRegisterMutation } from "@/redux/api/user.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Spinner from "@/components/Spinner";
import { SignupForm } from "@/types/reducer.types";
import { setUser, setUserAuth } from "@/redux/slices/userSlice";

const Signup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
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

  const signupHandler = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!checked) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return;
    }

    try {
      const result = await register({
        email: form.email,
        password: form.password,
        // dob: form.dob,
      }).unwrap();
      console.log("User signup User: ", result);

      if (result.error) {
        Alert.alert(
          "Error",
          result.error.message || "An error occurred during login"
        );
        return;
      }

      await AsyncStorage.setItem("jwt", result.token);

      dispatch(setUser(result.user)); // Assuming result.user contains the user data
      dispatch(setUserAuth(true));

      Alert.alert("Success", "User signed up successfully");
      setForm({
        email: "",
        confirmPassword: "",
        dob: "",
        password: "",
      });
      router.replace("/(tabs)/home");
    } catch (error: Error | any) {
      Alert.alert("Error", error.data.message);
      console.log(error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <SafeAreaView className="bg-blue-100 h-full">
      <ScrollView>
        <View className=" w-full justify-center min-h-[85vh] px-4 py-6">
          <View className="">
            <Text className="text-3xl text-center mb-4 text-black font-psemibold">
              Signup
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
              <FormField
                title="ConfirmPassword"
                handleChangeText={(e) =>
                  setForm({ ...form, confirmPassword: e })
                }
                value={form.confirmPassword}
                placeholder="Confirm Password"
              />
              {/* <FormField
                title="Date of Birth"
                handleChangeText={(e) => setForm({ ...form, dob: e })}
                value={form.dob}
                placeholder="Date of Birth (YYYY-MM-DD)"
              /> */}
            </View>

            <View className="flex mb-2 items-center justify-center flex-row">
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color="blue"
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Accept terms and conditions</Text>
            </View>

            <CustomButton
              title="Create an Account"
              handlePress={signupHandler}
              containerStyles="bg-blue-600"
            />
          </View>

          {/* <Divider className="my-6" /> */}

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className=" text-black font-pregular">
              Already have an account ?
            </Text>
            <Link href={"/sign-in"} className=" font-psemibold text-blue-600">
              {" "}
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

{
  /* <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
        className="h-[225] w-[90]"
        source={require("@/assets/images/light.png")}
      /> */
}
