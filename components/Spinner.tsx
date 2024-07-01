import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Spinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]} className="bg-zinc-200">
      <ActivityIndicator size={50}  />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
