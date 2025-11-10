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

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
// 🚨 AJUSTE O CAMINHO PARA O SEU ARQUIVO firebaseConfig
import { db } from "../../../firebaseconfig";

// ID FIXO para filtrar os serviços desta barbearia
const SHOP_ID_TESTE = "BarbeChatbotTeste123";

export default function Servicos() {
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [duracao, setDuracao] = React.useState("");
  const [servicos, setServicos] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true); // ⬅️ Adicionado o estado de carregamento
  const [numeroWhatsApp, setNumeroWhatsApp] = React.useState("");
  const [linkGerado, setLinkGerado] = React.useState("");

  // ➡️ CARREGAR SERVIÇOS DO FIRESTORE EM TEMPO REAL
  React.useEffect(() => {
    const servicosRef = collection(db, "servicos");

    // Consulta: Filtra pelo ShopId e ordena pela data de criação
    const q = query(servicosRef, where("shopId", "==", SHOP_ID_TESTE));

    // onSnapshot cria um ouvinte em tempo real
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const servicosCarregados = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Converte de volta para string para TextInputs
            preco: data.preco ? String(data.preco) : "",
            duracao: data.duracao ? String(data.duracao) : "",
          };
        });

        setServicos(servicosCarregados);
        setCarregando(false);
      },
      (error) => {
        console.error("Erro ao carregar serviços: ", error);
        setCarregando(false);
        Alert.alert("Erro", "Falha ao carregar serviços do banco de dados.");
      }
    );

    // Função de limpeza: interrompe a escuta
    return () => unsubscribe();
  }, []);

  // Adiciona um novo serviço ao Firestore
  async function handleAdicionarServico() {
    if (!nome.trim() || preco.trim() === "" || duracao.trim() === "") {
      Alert.alert("Atenção", "Preencha o nome, preço e duração do serviço.");
      return;
    }

    try {
      const novoServico = {
        nome: nome.trim(),
        preco: parseFloat(preco), // Salvar como NÚMERO
        duracao: parseInt(duracao), // Salvar como NÚMERO
        // Horários são gerenciados pelo chatbot
        shopId: SHOP_ID_TESTE,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "servicos"), novoServico);

      Alert.alert("Sucesso", "Serviço adicionado ao Firebase!");
      setNome("");
      setPreco("");
      setDuracao("");
    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar o serviço. Verifique sua conexão."
      );
    }
  }

  // Exclui um serviço do Firestore
  async function handleExcluir(id) {
    try {
      await deleteDoc(doc(db, "servicos", id));
      Alert.alert("Sucesso", "Serviço excluído do Firebase!");
    } catch (error) {
      console.error("Erro ao excluir: ", error);
      Alert.alert(
        "Erro",
        "Não foi possível excluir o serviço. Tente novamente."
      );
    }
  }

  // Função para gerar o link do chatbot (esta função está correta)
  function handleGerarLink() {
    if (!numeroWhatsApp.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha o número do WhatsApp da barbearia (com 55 e DDD)."
      );
      return;
    }

    const PALAVRA_CHAVE_INICIO = "INICIAR AGENDAMENTO";
    const mensagem = encodeURIComponent(PALAVRA_CHAVE_INICIO);

    const numeroFormatado = numeroWhatsApp.replace(/\D/g, "");
    const numeroCompleto = numeroFormatado.startsWith("55")
      ? numeroFormatado
      : "55" + numeroFormatado;

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
        placeholder="Preço (ex: 50)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (min)"
        value={duracao}
        onChangeText={setDuracao}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={handleAdicionarServico}>
        <Text style={styles.textoBotao}>Adicionar Serviço</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Serviços cadastrados</Text>

      {carregando ? (
        <Text style={styles.msgVazio}>Carregando serviços...</Text>
      ) : servicos.length === 0 ? (
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
                {/* 🚨 Removida a lógica de exibição de horários */}
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
