import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <ImageBackground
      source={require("../../../assets/images/bb.png")} // Caminho para a imagem de fundo
      style={styles.background}
    >
      <View style={styles.overlay}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta a imagem para cobrir toda a tela
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(23, 37, 84, 0.2)", // Cor de fundo translúcida para destacar o conteúdo
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "50%",
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    borderRadius: 50,
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
