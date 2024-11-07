import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import * as Location from "expo-location";

export default function Sobre() {
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  // Coordenadas fixas da Barbearia Reserva (obtidas do link do Google Maps)
  const destination = {
    latitude: -8.0246179,
    longitude: -35.0397335,
  };

  // Solicitar permissão para acessar a localização
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermissionGranted(true);
    } else {
      console.log("Permissão de localização negada");
    }
  };

  // Função para obter a localização atual do usuário
  const openGoogleMaps = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const origin = `${location.coords.latitude},${location.coords.longitude}`;
    const dest = `${destination.latitude},${destination.longitude}`;

    const googleMapsURL = Platform.select({
      ios: `https://maps.apple.com/?saddr=${origin}&daddr=${dest}`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}&origin=${origin}`,
    });

    Linking.openURL(googleMapsURL);
  };

  useEffect(() => {
    requestLocationPermission(); // Solicita permissão ao carregar o componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva Barbershop</Text>
      <Text style={styles.description}>
        A Reserva Barbershop é um espaço dedicado aos cuidados masculinos,
        oferecendo serviços de barbearia tradicional, cortes de cabelo,
        tratamentos estéticos, entre outros.
      </Text>
      <Text style={styles.description}>
        Nossa equipe é formada por profissionais qualificados e experientes,
        comprometidos em oferecer um atendimento de qualidade e proporcionar uma
        experiência única para nossos clientes.
      </Text>
      <Text style={styles.description}>
        Além dos serviços de barbearia, também oferecemos uma variedade de
        produtos de cuidados masculinos, incluindo pomadas, shampoos, cremes e
        acessórios.
      </Text>
      <Text style={styles.description}>
        Venha nos visitar e descubra o que a Reserva Barbershop tem a oferecer
        para você. Estamos ansiosos para recebê-lo!
      </Text>
      <Button title="Ir para a Reserva Barbershop" onPress={openGoogleMaps} />

      {/* Exibe o mapa com a localização da Barbearia */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.0022, // Ajuste o zoom (quanto menor o valor, maior o zoom)
          longitudeDelta: 0.0021, // Ajuste o zoom (quanto menor o valor, maior o zoom)
        }}
      >
        {/* Marcador com cor vermelha */}
        <Marker
          coordinate={destination}
          title="Reserva Barbershop"
          pinColor="red" // Definindo a cor do marcador como vermelho
        />

        {/* Ou use um ícone personalizado */}
        {/* 
        <Marker
          coordinate={destination}
          title="Reserva Barbershop"
          image={require('./assets/custom_marker.png')} // Defina o caminho para sua imagem personalizada
        />
        */}
      </MapView>

      {/* Botão para abrir o Google Maps com a rota até a Barbearia */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000000c0",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
  description: {
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  map: {
    width: "100%",
    height: 400, // Ajuste a altura do mapa para garantir que ele seja visível
    marginTop: 20,
  },
});
