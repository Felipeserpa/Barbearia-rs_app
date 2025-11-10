import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

export default function GerarLink({ route, navigation }) {
  const { servico } = route.params;

  // Gera o link (exemplo)
  const link = `https://chatbot.maeubarber.com/agendamento?servico=${encodeURIComponent(
    servico.nome
  )}&preco=${encodeURIComponent(servico.preco)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Link de Agendamento Gerado</Text>
      <Text style={styles.texto}>
        Serviço: <Text style={styles.destaque}>{servico.nome}</Text>
      </Text>
      <Text style={styles.texto}>
        Preço: <Text style={styles.destaque}>R$ {servico.preco}</Text>
      </Text>

      <View style={styles.caixaLink}>
        <Text style={styles.link}>{link}</Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => Linking.openURL(link)}
      >
        <Text style={styles.textoBotao}>Abrir no Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: "#555" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  destaque: {
    fontWeight: "700",
  },
  caixaLink: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    marginVertical: 20,
    width: "100%",
  },
  link: {
    color: "#1E88E5",
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#1E88E5",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "700",
  },
});
