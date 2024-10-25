import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo.jpg")}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172554",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "60%",
  },
  button: {
    backgroundColor: "#ffa500",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10, // Espaço entre os botões
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
