import React from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRouter from "./auth.routes";
import { createSwitchNavigator } from "@react-navigation/native";

import { AppStack } from "./app";

import AppStack from "./routes/appStack";

function Routes() {
  const loading = false; // Replace with your actual loading state logic
  const signed = false;

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : signed ? (
    <AppStack />
  ) : (
    <AuthRouter />
  );

  const RootStack = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen, // Tela para lidar com o carregamento inicial do aplicativo
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  );
}

export default Routes;
