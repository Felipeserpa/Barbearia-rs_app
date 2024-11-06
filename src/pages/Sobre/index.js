import * as React from "react";
import { View, Text } from "react-native";

export default function Sobre({ navigation }) {
  return (
    <View
      style={{
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: 9,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Barbearia Reserva</Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        A Barbearia Reserva é um espaço dedicado aos cuidados masculinos,
        oferecendo serviços de barbearia tradicional, cortes de cabelo,
        tratamentos estéticos, entre outros.
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Nossa equipe é formada por profissionais qualificados e experientes,
        comprometidos em oferecer um atendimento de qualidade e proporcionar uma
        experiência única para nossos clientes.
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Além dos serviços de barbearia, também oferecemos uma variedade de
        produtos de cuidados masculinos, incluindo pomadas, shampoos, cremes e
        acessórios.
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Venha nos visitar e descubra o que a Barbearia Reserva tem a oferecer
        para você. Estamos ansiosos para recebê-lo!
      </Text>
    </View>
  );
}
