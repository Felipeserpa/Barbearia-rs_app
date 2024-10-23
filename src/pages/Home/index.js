import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Image
        style={style.logo}
        source={require("../../../assets/images/logo.jpg")}
      />
      <View style={style.areaFormulario}>
        <Button
          style={style.button}
          title="Login"
          color="#ffa500"
          onPress={() => navigation.navigate("Login")}
        />

        <Button
          style={style.button}
          title="Cadastro"
          color="#ffa500"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
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
  logo: {
    width: 150,
    height: 158,
    borderRadius: 50,
  },
  button: {
    width: 80,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
  areaFormulario: {
    flexDirection: "column",
    margin: 10,
  },
});
