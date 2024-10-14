import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin({ navigation }) {
  const [text, onChangeText] = React.useState("Digite seu email");

  return (
    <View style={styles.container}>
      <Text style={styles.bancoLogo}>Banco Sujeito</Text>
      <View style={styles.areaFormulario}>
        <Text style={styles.textoNome}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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
    color: "#000000",
    fontWeight: "bold",
  },
});
