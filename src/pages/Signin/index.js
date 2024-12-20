import React from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Signin({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

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
          placeholder="Enter your email"
        />
        <Text style={styles.textoNome}>Senha:</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter your password"
        />
        <Button title="login" color="#ffa500" style={styles.title} />
      </View>
      <View style={{ flexDirection: "row", paddingLeft: 2 }}>
        <Text
          style={styles.textocadastro}
          onPress={() => navigation.navigate("SignUp")}
        >
          Cadastre-se
        </Text>
        <Text style={styles.textoNomes}>Recuperar sua senha</Text>
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
  textocadastro: {
    paddingTop: 0,
    fontSize: 13,
    color: "#FFFFFF",
    marginHorizontal: 0,
  },
  textoNomes: {
    paddingTop: 0,
    fontSize: 13,
    color: "#FFFFFF",
    marginHorizontal: 20,
    paddingLeft: 109,
    width: wp("60%"),
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
    width: wp("90%"),
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
