import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Servicos() {
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [duracao, setDuracao] = React.useState("");
  const [data, setData] = React.useState("");
  const [hora, setHora] = React.useState("");
  const [servicos, setServicos] = React.useState([]);
  const [numeroWhatsApp, setNumeroWhatsApp] = React.useState("");
  const [linkGerado, setLinkGerado] = React.useState("");

  // Adiciona um novo serviço
  function handleAdicionarServico() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Preencha o nome do serviço.");
      return;
    }

    const novo = {
      id: Date.now().toString(),
      nome,
      preco,
      duracao,
      horarios:
        data && hora ? [{ id: Math.random().toString(), data, hora }] : [],
    };

    setServicos((prev) => [novo, ...prev]);
    limparCampos();
  }

  function limparCampos() {
    setNome("");
    setPreco("");
    setDuracao("");
    setData("");
    setHora("");
  }

  function handleExcluir(id) {
    setServicos((prev) => prev.filter((s) => s.id !== id));
  }

  function handleAdicionarHorario(servicoId) {
    if (!data.trim() || !hora.trim()) {
      Alert.alert("Preencha a data e hora.");
      return;
    }

    setServicos((prev) =>
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

  // Gerar link do WhatsApp com os serviços cadastrados
  // Gerar link do WhatsApp para INICIAR o Chatbot
  function handleGerarLink() {
    if (!numeroWhatsApp.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha o número do WhatsApp da barbearia (com 55 e DDD)."
      );
      return;
    }

    // REMOVEMOS A VERIFICAÇÃO DE servicos.length > 0, pois o chatbot funcionará mesmo sem serviços cadastrados AQUI.
    // O chatbot fará a consulta dos serviços no Firebase.

    // A mensagem agora é uma PALAVRA-CHAVE simples para iniciar o fluxo no chatbot/Twilio
    const PALAVRA_CHAVE_INICIO = "INICIAR AGENDAMENTO";
    const mensagem = encodeURIComponent(PALAVRA_CHAVE_INICIO);

    // Formata o número (garantindo que o 55 + DDD esteja presente)
    // Se o usuário digitar (81) 99999-9999, o regex remove tudo e fica 81999999999
    const numeroFormatado = numeroWhatsApp.replace(/\D/g, "");

    // VERIFICAÇÃO CRÍTICA: Se o usuário não incluiu o 55, o código DEVE adicioná-lo.
    // Assumimos que o número inserido é do Brasil (81...)
    const numeroCompleto = numeroFormatado.startsWith("55")
      ? numeroFormatado
      : "55" + numeroFormatado;

    // Constrói o novo link do Chatbot
    const link = `https://wa.me/${numeroCompleto}?text=${mensagem}`;
    setLinkGerado(link);
    Alert.alert(
      "Link do Chatbot Gerado!",
      "Copie e cole este link. O chatbot iniciará quando o cliente enviar a mensagem 'INICIAR AGENDAMENTO'."
    );
  }

  async function handleCopiarLink() {
    if (!linkGerado) {
      Alert.alert("Gere o link primeiro!");
      return;
    }
    await Clipboard.setStringAsync(linkGerado);
    Alert.alert("Link copiado!", "Agora você pode enviar aos seus clientes.");
  }

  function handleAbrirWhatsApp() {
    if (!linkGerado) {
      Alert.alert("Atenção", "Gere o link primeiro.");
      return;
    }
    Linking.openURL(linkGerado);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Serviços 💈</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Serviço"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (ex: 50,00)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (min)"
        value={duracao}
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

      {servicos.length === 0 ? (
        <Text style={styles.msgVazio}>Nenhum serviço ainda.</Text>
      ) : (
        <FlatList
          data={servicos}
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
            </View>
          )}
        />
      )}

      {/* Seção de geração do link */}
      <View style={styles.linkContainer}>
        <Text style={styles.subtitulo}>Gerar link do Chatbot 💬</Text>
        <TextInput
          style={styles.input}
          placeholder="Número WhatsApp (ex: 5599999999999)"
          value={numeroWhatsApp}
          onChangeText={setNumeroWhatsApp}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.botao} onPress={handleGerarLink}>
          <Text style={styles.textoBotao}>Gerar Link</Text>
        </TouchableOpacity>

        {linkGerado ? (
          <View style={styles.resultado}>
            <Text style={styles.link}>{linkGerado}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btnAcao, { backgroundColor: "#2196F3" }]}
                onPress={handleCopiarLink}
              >
                <Text style={styles.textoBotao}>Copiar Link</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnAcao, { backgroundColor: "#25D366" }]}
                onPress={handleAbrirWhatsApp}
              >
                <Text style={styles.textoBotao}>Abrir WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
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
  linkContainer: {
    marginTop: 20,
  },
  resultado: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  link: {
    fontSize: 13,
    color: "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnAcao: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
