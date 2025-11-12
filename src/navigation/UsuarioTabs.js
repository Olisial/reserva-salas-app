// src/navigation/UsuarioTabs.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Telas do usuário
import TabIcon from '../components/navigation/TabIcon';
import HistoricoReservas from '../screens/usuario/HistoricoReservas'; // nova tela
import HomeUsuario from '../screens/usuario/HomeUsuario';
import NotificacaoReserva from '../screens/usuario/NotificacaoReserva';
import ReservarPorta from '../screens/usuario/ReservarPorta';

const Tab = createBottomTabNavigator();

const LABEL_STYLE = {
  fontSize: 12,
  fontWeight: '700',
  letterSpacing: 0.3,
  textTransform: 'none',
};

export default function UsuarioTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          borderTopWidth: 0,
          height: 74,
          paddingHorizontal: 18,
          paddingTop: 10,
          paddingBottom: 14,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.45,
          shadowRadius: 16,
        },
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: 'rgba(226, 232, 240, 0.58)',
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeUsuario"
        component={HomeUsuario}
        options={{
          title: 'Início',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Início</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home-outline" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="ReservarPorta"
        component={ReservarPorta}
        options={{
          title: 'Reservar',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Reservar</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="key-outline" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="HistoricoReservas"
        component={HistoricoReservas}
        options={{
          title: 'Histórico',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Histórico</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="time-outline" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="NotificacaoReserva"
        component={NotificacaoReserva}
        options={{
          title: 'Notificações',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Notificações</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="notifications-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
