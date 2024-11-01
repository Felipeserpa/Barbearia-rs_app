import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackRouter } from "@react-navigation/native";

import HomeScreen from "../pages/HomeScreen";

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigatior>
      <Drawer.Screen name="HomeScreen" component={StackRouter} />
    </Drawer.Navigatior>
  );
}
