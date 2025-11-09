import * as React from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/image1.jpg")}
        />

        <Image
          style={styles.image}
          source={require("../../../assets/images/image2.jpg")}
        />
      </View>

      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Agendar Corte"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 70,
    backgroundColor: "#b4b4b4",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    gap: 30,
  }, // Adjust spacing as needed
  image: {
    width: 150,
    height: 290,
  },
});
