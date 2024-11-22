import React from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRouter from "./auth.routes";
import { createSwitchNavigator } from "@react-navigation/native";

import AppRoutes from "./app.routes";

function Routes() {
  const loading = false; // Replace with your actual loading state logic
  const signed = true;

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : signed ? (
    <AppRoutes />
  ) : (
    <AuthRouter />
  );
}

export default Routes;
