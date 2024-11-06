import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/HomeScreen";
import Sobre from "../pages/Sobre";
import Perfil from "../pages/Perfil";
const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Agenda" component={Home} />
      <AppDrawer.Screen name="Perfil" component={Perfil} />
      <AppDrawer.Screen name="Sobre" component={Sobre} />
    </AppDrawer.Navigator>
  );
}
