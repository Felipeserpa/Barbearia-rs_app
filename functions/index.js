// 1. IMPORTS NECESSÁRIOS
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio"); // ⬅️ Biblioteca para gerar TwiML

// 🚨 Inicialize o Admin SDK (necessário para Firestore)
admin.initializeApp();
const db = admin.firestore();

// 🚨 Configure a Twilio (Você deve configurar essas variáveis no Firebase Functions Environment Variables)
// Por enquanto, vamos hardcodar (colocar o valor fixo) para simplificar
const accountSid = functions.config().twilio.sid || "YOUR_TWILIO_ACCOUNT_SID";
const authToken = functions.config().twilio.token || "YOUR_TWILIO_AUTH_TOKEN";

// Use as credenciais da Twilio para criar o objeto de mensageria (não usado aqui, mas útil)
// const client = new twilio(accountSid, authToken);

// Use TwiML para criar o objeto de resposta
const MessagingResponse = twilio.twiml.MessagingResponse;

// 🚨 DEFINIÇÃO DO ID DA BARBEARIA E HORÁRIO FIXO
const SHOP_ID = "BarbeChatbotTeste123";
const HORARIO_FUNCIONAMENTO = {
  dias_semana: [1, 2, 3, 4, 5], // 1=Segunda a 5=Sexta
  inicio_dia: "09:00",
  fim_dia: "19:00",
  intervalo_minutos: 60, // Slot de 60 minutos
};

// ----------------------------------------------------------------------
// 🚨 LÓGICA PRINCIPAL: O WEBHOOK QUE A TWILIO CHAMA
// ----------------------------------------------------------------------

exports.webhook = functions.https.onRequest(async (req, res) => {
  // 1. Instanciar a resposta Twilio
  const twiml = new MessagingResponse();

  // 2. Obter a mensagem do usuário (do corpo da requisição POST do Twilio)
  const userMessage = req.body.Body ? req.body.Body.trim().toUpperCase() : "";
  const userNumber = req.body.From; // Número do cliente

  functions.logger.info(`Mensagem recebida de ${userNumber}: ${userMessage}`);

  try {
    // 3. LÓGICA DE INÍCIO DE CONVERSA
    if (userMessage === "INICIAR AGENDAMENTO" || userMessage === "OI") {
      // A. Buscar serviços no Firestore
      const servicesSnapshot = await db
        .collection("servicos")
        .where("shopId", "==", SHOP_ID)
        .orderBy("nome")
        .get();

      if (servicesSnapshot.empty) {
        twiml.message(
          "Desculpe, não há serviços cadastrados. Tente mais tarde."
        );
      } else {
        // B. Formatar a lista de serviços
        let message =
          "💈 Bem-vindo ao BarbeChatbot! 💈\n\nEscolha o serviço desejado, respondendo com o número:\n";

        servicesSnapshot.docs.forEach((doc, index) => {
          const service = doc.data();
          const preco = service.preco.toFixed(2).replace(".", ","); // Formata R$
          message += `${index + 1}. ${service.nome} (R$ ${preco})\n`;
        });

        // C. Armazenar o estado da conversa (Aqui você precisaria salvar em uma coleção 'conversas')
        // ... (Lógica para salvar o estado: ESPERANDO_ESCOLHA_SERVICO)

        twiml.message(message);
      }
    } else if (userMessage === "AJUDA") {
      twiml.message('Para iniciar um agendamento, envie "INICIAR AGENDAMENTO"');
    } else {
      // 4. Se o usuário estiver no meio do fluxo (EXEMPLO SIMPLIFICADO)
      // Aqui você deve ter a lógica para verificar o estado da conversa no Firestore.

      // Lógica Padrão de Resposta
      twiml.message(
        `Sua mensagem: "${userMessage}" foi recebida. Por favor, envie "INICIAR AGENDAMENTO" para ver os serviços.`
      );
    }
  } catch (error) {
    functions.logger.error("Erro no Webhook:", error);
    twiml.message("Houve um erro no sistema. Tente novamente mais tarde.");
  }

  // 5. Enviar a resposta TwiML de volta para a Twilio
  res.set("Content-Type", "text/xml").status(200).send(twiml.toString());
});

// ----------------------------------------------------------------------
// FUNÇÕES UTILITÁRIAS (CALCULO DE SLOTS)
// ----------------------------------------------------------------------

// ... (Mantenha as funções 'gerarSlotsDeHorario' e 'getAvailableSlots' que forneci anteriormente)

/*
function gerarSlotsDeHorario(...) { ... }
exports.getAvailableSlots = functions.https.onCall(...) { ... }
*/

// IMPORTANTE: Adicione as funções 'gerarSlotsDeHorario' e 'getAvailableSlots'
// do código anterior no final deste arquivo!
