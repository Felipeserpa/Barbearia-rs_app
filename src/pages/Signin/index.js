import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin({ navigation }) {
  const [text, onChangeText] = React.useState("Useless Text");

  return (
    <View style={styles.container}>
      <Text>Home login</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Signup")}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
