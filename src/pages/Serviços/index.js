import * as react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Serviços({ navigation }) {
  const [nome, setNome] = react.useState("");
  const [preco, setPreco] = react.useState("");
  const [duraçao, setDuracao] = react.useState("");
  const [data, setData] = react.useState("");
  const { hora, setHora } = react.useState("");
  const [servico, setServico] = react.useState("");

  // Função para adicionar um novo serviço
  function handleAdicionarServico() {
    if (!nome.trim()) {
      alert("Atenção", "Preencha o nome do serviço.");
      return;
    }
    // Cria um novo objeto de serviço
    const novo = {
      id: Date.now().toString(),
      nome: nome.trim(),
      preco: preco.trim(),
      duracao: duracao.trim(),
      horarios:
        data && hora ? [{ id: Math.random().toString(), data, hora }] : [],
    };
    // Adiciona o novo serviço à lista
    setServico((prev) => [novo, ...prev]);
    limparCampos();
  }
  // Função para limpar os campos do formulário
  function limparCampos() {
    setNome("");
    setPreco("");
    setDuracao("");
    setData("");
    setHora("");
  }
  // Função para excluir um serviço
  function handleExcluir(id) {
    setServico((prev) => prev.filter((s) => s.id !== id));
  }
  // Função para adicionar um horário a um serviço existente
  function handleAdicionarHorario(servicoId) {
    if (!data.trim() || !hora.trim()) {
      Alert.alert("Preencha a data e hora.");
      return;
    }

    setServico((prev) =>
      prev.map((s) =>
        s.id === servicoId
          ? {
              ...s,
              horarios: [
                ...s.horarios,
                { id: Math.random().toString(), data, hora },
              ],
            }
          : s
      )
    );
    setData("");
    setHora("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastra Serviços</Text>
      <ScrollView styel={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Serviço"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço{ex: 50,00}"
          value={preco}
          onChangeText={setPreco}
        />
        <TextInput
          style={styles.input}
          placeholder="Duração (min"
          value={duraçao}
          onChangeText={setDuracao}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Data (ex: 12/11/2025)"
            value={data}
            onChangeText={setData}
          />
          <TextInput
            style={[styles.input, { width: 100, marginLeft: 8 }]}
            placeholder="Hora (ex: 14:00)"
            value={hora}
            onChangeText={setHora}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleAdicionarServico}>
          <Text style={styles.textoBotao}>Adicionar Serviço</Text>
        </TouchableOpacity>
        <Text style={styles.subtitulo}>Serviços cadastrados</Text>
        {servico.length === 0 ? (
          <Text style={styles.msgVazio}>Nenhum serviço ainda.</Text>
        ) : (
          <FlatList
            data={servico}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.detalhes}>
                    {item.preco ? `R$ ${item.preco}` : ""}{" "}
                    {item.duracao ? `• ${item.duracao} min` : ""}
                  </Text>

                  <Text style={{ marginTop: 8, fontWeight: "700" }}>
                    Horários disponíveis:
                  </Text>
                  {item.horarios.length === 0 ? (
                    <Text style={{ color: "#777" }}>
                      Nenhum horário cadastrado
                    </Text>
                  ) : (
                    item.horarios.map((h) => (
                      <Text key={h.id}>
                        • {h.data} — {h.hora}
                      </Text>
                    ))
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleExcluir(item.id)}
                  style={styles.btnExcluir}
                >
                  <Text style={{ color: "#fff" }}>Excluir</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Data"
                    value={data}
                    onChangeText={setData}
                  />
                  <TextInput
                    style={[styles.input, { width: 100, marginLeft: 8 }]}
                    placeholder="Hora"
                    value={hora}
                    onChangeText={setHora}
                  />
                  <TouchableOpacity
                    style={[styles.botaoPequeno]}
                    onPress={() => handleAdicionarHorario(item.id)}
                  >
                    <Text style={styles.textoBotao}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E1E2D",
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  botao: {
    backgroundColor: "#1E88E5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoPequeno: {
    backgroundColor: "#1E88E5",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "700",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  msgVazio: {
    textAlign: "center",
    color: "#777",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
  },
  detalhes: {
    color: "#555",
  },
  btnExcluir: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 8,
  },
});
