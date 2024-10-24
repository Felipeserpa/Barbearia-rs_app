import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="     Bem-vindos Reserva_Barbearia"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: "#ffa500",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      {/* Outras telas aqui */}
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
