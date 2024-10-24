import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../routes/index";

function App() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffa500" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;
