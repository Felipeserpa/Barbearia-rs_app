import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
// REMOVA: import { NavigationContainer } from "@react-navigation/native";
import Routes from "../routes";

export default function Page() {
  return (
    // REMOVA: <NavigationContainer independent={true}>
    <>
      <Routes />
      <StatusBar barStyle="dark-content" backgroundColor="#ffa500" />
    </>
    // REMOVA: </NavigationContainer>
  );
}
