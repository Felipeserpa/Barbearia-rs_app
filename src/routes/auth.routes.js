import React from "react";

// MUDANÇA AQUI: Usar createNativeStackNavigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";

// MUDANÇA AQUI: Chamar createNativeStackNavigator()
const AuthStack = createNativeStackNavigator();

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
