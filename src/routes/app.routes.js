import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/HomeScreen";
import Sobre from "../pages/Sobre";
const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Agendamento" component={Home} />
      <AppDrawer.Screen name="Sobre" component={Sobre} />
    </AppDrawer.Navigator>
  );
}
