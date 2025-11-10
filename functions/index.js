// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;

// 1. Inicializa o Admin SDK e o Banco de Dados (Firestore)
// O admin.initializeApp() lê as credenciais do ambiente do Firebase Cloud.
admin.initializeApp();
const db = admin.firestore();

// 2. Carrega as configurações seguras da Twilio
const config = functions.config().twilio;

// 3. Endpoint principal (Webhook da Twilio)
exports.webhook = functions.https.onRequest(async (req, res) => {
  // Twilio envia os dados no corpo (body) da requisição
  const incomingMessage = req.body.Body
    ? req.body.Body.trim().toLowerCase()
    : "";
  // const senderId = req.body.From; // Número do cliente

  const twiml = new MessagingResponse();
  let responseText = "";

  // --- A LÓGICA DE AGENDAMENTO COMEÇA AQUI ---

  // A palavra-chave que seu app RN envia (ou uma saudação inicial)
  if (
    incomingMessage === "iniciar agendamento" ||
    incomingMessage === "1" ||
    incomingMessage === "oi"
  ) {
    // Consulta todos os serviços cadastrados no Firestore pelo seu app RN
    const servicesSnapshot = await db.collection("servicos").get();

    if (servicesSnapshot.empty) {
      responseText =
        "Desculpe, a barbearia ainda não tem serviços cadastrados. Por favor, volte mais tarde.";
    } else {
      responseText =
        "Bem-vindo(a) ao BarbeChatbot! 💈\nEscolha o serviço que você deseja agendar (responda com o *número*):\n\n";

      servicesSnapshot.docs.forEach((doc, index) => {
        const servico = doc.data();
        // A estrutura aqui depende do que você salvou no Firestore
        responseText += `${index + 1}. ${servico.nome} - R$ ${servico.preco}\n`;
      });
      responseText += "\n\nResponda com o número do serviço desejado.";

      // IMPORTANTE: Em um chatbot real, você salvaria o estado ('esperando_servico')
      // para saber o que esperar na próxima mensagem do cliente.
    }
  }
  // Futura Lógica: O cliente responde '1' (Corte de cabelo)
  else if (!isNaN(parseInt(incomingMessage))) {
    // Lógica de manipulação de número:
    // Aqui você buscaria os horários disponíveis para o serviço escolhido

    // Simulação de resposta:
    responseText = `Você escolheu a opção ${incomingMessage}. Agora, digite *ver horários* para ver as vagas disponíveis.`;
  } else {
    responseText =
      "Por favor, digite *oi* ou *iniciar agendamento* para ver o menu principal.";
  }

  // --- FIM DA LÓGICA DO CHATBOT ---

  // 4. Envia a resposta de volta para a Twilio
  twiml.message(responseText);
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
