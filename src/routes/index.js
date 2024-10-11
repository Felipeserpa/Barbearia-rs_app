import React from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRouter from "./auth.routes";

function Routes() {
  const loading = false; // Replace with your actual loading state logic
  const signed = false;

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : signed ? (
    <View></View>
  ) : (
    <AuthRouter />
  );
}

export default Routes;
