import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../routes/index";
import { Colors } from "react-native/Libraries/NewAppScreen";

function App() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;
