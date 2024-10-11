import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Routes from "../routes/auth.routes";
export default function app() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
