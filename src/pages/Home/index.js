import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Text>This is some text</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Login", { name: "Jane" })}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172554",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
});
