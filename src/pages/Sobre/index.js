import * as React from "react";
import { View, Text, Platform } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

export default function Sobre({ navigation }) {
  const [region, setRegion] = useState({
    latitude: -8.123456,
    longitude: -35.123456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation(); // Call function to fetch location
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === "ios") {
      // Handle iOS permissions using another method (e.g., react-native-permissions)
    }
  };

  // Function to get the current location using geolocation
  const getCurrentLocation = () => {
    if (Geolocation) {
      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => {
          console.error("Geolocation Error: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } else {
      console.error("Geolocation is not available");
    }
  };

  // useEffect to request permission when component mounts
  useEffect(() => {
    if (Geolocation) {
      requestLocationPermission();
    } else {
      console.error("Geolocation service not available");
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
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

      <MapView style={{ flex: 1, width: "100%" }} initialRegion={region}>
        <Marker coordinate={region} title="Barbearia Reserva São Lourenço" />
      </MapView>
    </View>
  );
}
