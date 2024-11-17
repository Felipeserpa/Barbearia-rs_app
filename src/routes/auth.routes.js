import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../pages/Signup";
import SignIn from "../pages/Signin";
import Home from "../pages/Home";
const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Bem-vindos Reserva_Barbearia"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      {/* Outras telas aqui */}
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
