import React from "react";
import { StatusBar, View } from "react-native";

import Routes from "../routes";

export default function Page() {
  return (
    <View style={{ flex: 3 }}>
      <StatusBar />
      <Routes />
    </View>
  );
}
