import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Sobre() {
  const [region, setRegion] = useState({
    latitude: -8.123456,
    longitude: -35.123456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      getCurrentLocation();
    } else {
      console.log("Permissão de localização negada");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission(); // Solicita permissão ao carregar o componente
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
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

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <MapView initialRegion={region}>
          <Marker coordinate={region} title="Barbearia Reserva São Lourenço" />
        </MapView>
      </View>
    </View>
  );
}
