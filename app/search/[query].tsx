import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";
import { activationLinks } from "@/utils/data"; // Adjust this import according to your project structure
import { images } from "@/constants";

interface ActivationLink {
  name: string;
  link: string;
}

const Search: React.FC = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [data, setData] = useState<ActivationLink[]>([]);

  /* useEffect(() => {
    if (query) {
      const filteredData = activationLinks.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData([]);
    }
  }, [query]); */

  useEffect(() => {
    if (query) {
      const filteredData = activationLinks.filter((item) => {
        const itemName = item.name.toLowerCase();
        const itemLink = item.link.toLowerCase();
        const queryTerms = query.toLowerCase().split(/\s+/);

        // Check if all terms in the query match any part of the item name or link
        return queryTerms.every(
          (term) => itemName.includes(term) || itemLink.includes(term)
        );
      });
      setData(filteredData);
    } else {
      setData([]);
    }
  }, [query, activationLinks]);

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView className="bg-blue-100 pt-24 mx-1 h-full">
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(`https://${item.link}`)}
            className="m-1 flex-1 flex-col"
          >
            <Button
              mode="contained"
              style={{
                marginBottom: 8,
                paddingVertical: 8,
                backgroundColor: "#FFA500",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {item.name}
              </Text>
            </Button>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
              <Text className="text-2xl pb-20 font-psemibold text-black-100">
                Searched Results for '{query}'
              </Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center mt-20 text-center items-center">
            <Image
              source={images.notFound}
              className="h-[200px]"
              resizeMode="contain"
            />
            <Text className="text-xl font-psemibold pb-2 pt-6">
              No results found
            </Text>
            <Text className="text-zinc-600 text-lg w-[70%] text-center">
              We can't find anything matching your search
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
