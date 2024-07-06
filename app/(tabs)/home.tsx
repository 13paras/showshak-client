import SearchInput from "@/components/SearchInput";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { useGetUserQuery } from "@/redux/api/user.api";
import { activationLinks } from "@/utils/data";
import { AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import filter from "lodash.filter";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface ActivationLinkProps {
  name: string;
  link: string;
}

const initialButtons = [
  { name: "netflix", link: "netflix.com/tv2" },
  { name: "Amazon prime videos", link: "amazon.com/mytv" },
  { name: "disney+", link: "disneyplus.com/begin" },
  { name: "fubotv", link: "fubo.tv/connect" },
];

const Home = () => {
  const pathname = usePathname();
  const [id, setId] = useState("");
  const { data } = useGetUserQuery(id);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [displayData, setDisplayData] = useState<
    { name: string; link: string }[]
  >([]);
  const [linkData, setLinkData] = useState<ActivationLinkProps[]>([]);
  const { isAuthenticated, loading } = useIsAuthenticated();

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    console.log(query);
    if (query.trim() === "") {
      setDisplayData(initialButtons);
    } else {
      const formattedQuery = query.toLowerCase();
      const filteredData = filter(activationLinks, (item) => {
        return contains(item, formattedQuery);
      });
      setDisplayData(filteredData);
    }
  }, [query]);

  const contains = (item: ActivationLinkProps, query: string): boolean => {
    const nameLower = item.name.toLowerCase();
    const linkLower = item.link.toLowerCase();

    return nameLower.includes(query) || linkLower.includes(query);
  };

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to open the URL.")
    );
  };

  /*   useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("jwt");

      if (token) {
        const decodedToken = jwtDecode<CustomPayload>(token);
        const userId = decodedToken.userId;
        setId(userId);
        // console.log(userId);
      }
    };
    fetchUser();
  }, []); */

  const [showSplash, setShowSplash] = useState<boolean>(true);

  /*   useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 3000);
  }) */
  return (
    <SafeAreaView className="bg-blue-50 h-full mx-1">
      <StatusBar backgroundColor="#202020" style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex my-6 px-4">
          <View className="flex justify-between items-center flex-row mb-12">
            <View>
              <Text className="text-2xl font-psemibold ">Showshak</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="bg-violet-100 cursor-pointer rounded-full p-2"
            >
              <AntDesign name="user" size={32} />
            </TouchableOpacity>
          </View>
          <View className="mb-16">
            <SearchInput query={query} setQuery={setQuery} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <FlatList
        data={displayData}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(`https://${item.link}`)}
            className="m-1 flex-1 flex-col"
          >
            <Button
              mode="contained-tonal"
              className="mb-2 py-2 bg-orange-400 rounded-md"
            >
              <Text className="uppercase text-lg font-pmedium">
                {item.name}
              </Text>
            </Button>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
