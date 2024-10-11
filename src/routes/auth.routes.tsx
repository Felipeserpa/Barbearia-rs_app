import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Signin from "../pages/Signin"; // Certifique-se de que o caminho está correto
import Signup from "../pages/Signup"; // Certifique-se de que o caminho está correto

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
