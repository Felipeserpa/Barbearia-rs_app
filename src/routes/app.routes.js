import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/HomeScreen";
import Sobre from "../pages/Sobre";
import Perfil from "../pages/Perfil";
import Servicos from "../pages/Serviços";
import Produtos from "../pages/Produtos";
const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Agenda" component={Home} />
      <AppDrawer.Screen name="Perfil" component={Perfil} />
      <AppDrawer.Screen name="Loja" component={Produtos} />
      <AppDrawer.Screen name="Serviços" component={Servicos} />
      <AppDrawer.Screen name="Sobre" component={Sobre} />
    </AppDrawer.Navigator>
  );
}

/*import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { DatePicker } from 'react-native-datepicker';
import { Input } from 'react-native-elements';
import Mailer from 'react-native-mail';

const AgendamentoModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleAgendar = () => {
    // Lógica para enviar o email de confirmação
    const mail = {
      recipients: ['sua_email@example.com'],
      subject: 'Novo Agendamento',
      body: `
        Novo agendamento:
        * Nome: ${nome}
        * Email: ${email}
        * Data: ${selectedDate.toString()}
      `,
    };

    Mailer.mail(mail)
      .then(() => {
        console.log('Email enviado com sucesso');
        setModalVisible(false);
      })
      .catch((error) => {
        console.log('Erro ao enviar email:', error);
      });
  };

  return (
    <View>
      <Button title="Agendar" onPress={() => setModalVisible(true)} />
      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Input placeholder="Nome" value={nome} onChangeText={setNome} />
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <DatePicker
            date={selectedDate}
            mode="datetime"
            placeholder="Selecione a data e hora"
            format="YYYY-MM-DD HH:mm"
            onDateChange={(date) => setSelectedDate(date)}
          />
          <Button title="Confirmar Agendamento" onPress={handleAgendar} />
        </View>
      </Modal>
    </View>
  );
};

export default AgendamentoModal;
*/
