import React from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";

export default function Signin({ navigation }) {
  const [text, onChangeText] = React.useState("Digite seu email");
  const [password, onChangepassword] = React.useState("*****");

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo.jpg")}
      />

      <Text style={styles.bancoLogo}>Barbearia Reserva</Text>
      <View style={styles.areaFormulario}>
        <Text style={styles.textoNome}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.textoNome}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangepassword={onChangepassword}
          value={password}
        />
        <Button
          title="login"
          color="#ffa500"
          style={styles.title}
          onPress={() => navigation.navigate("SignUp")}
        />
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
    paddingTop: 0,
  },
  bancoLogo: {
    color: "#FFFFFF",
  },

  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#999999",
    backgroundColor: "#EEEEEE",
    color: "#000000",
    height: 38,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    width: 350,
  },
  areaFormulario: {
    flexDirection: "column",
    margin: 10,
  },
  textoNome: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  title: {
    color: "#FFFFFF",
    Button: "#ffa500",
  },
  logo: {
    width: 150,
    height: 158,
    borderRadius: 50,
  },
});
