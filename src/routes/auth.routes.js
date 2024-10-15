import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      {/* Outras telas aqui */}
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
