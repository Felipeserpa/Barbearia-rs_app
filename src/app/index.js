// Only import react-native-gesture-handler on native platforms
import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../routes/index";

function App() {
  return (
    <NavigationContainer independent={true}>
      <Routes />
      <StatusBar barStyle="dark-content" backgroundColor="#ffa500" />
    </NavigationContainer>
  );
}

export default App;
