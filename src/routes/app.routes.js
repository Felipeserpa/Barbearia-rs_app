import React from "react";

// 1. Importar o criador do Drawer Navigator
import { createDrawerNavigator } from "@react-navigation/drawer";

// 2. Importar as telas/componentes que você está usando
// (Ajuste os caminhos abaixo conforme a sua estrutura de pastas)
import Servicos from "../pages/Serviços";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil"; // Assumindo que "Cadastro Produto" usa a tela Perfil
import Produtos from "../pages/Produtos";
import Sobre from "../pages/Sobre";

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Serviços" component={Servicos} />
      <AppDrawer.Screen name="Agendamentos" component={Home} />
      <AppDrawer.Screen name="Cadastro Produto" component={Perfil} />
      <AppDrawer.Screen name="Loja" component={Produtos} />
      <AppDrawer.Screen name="Sobre" component={Sobre} />
    </AppDrawer.Navigator>
  );
}
