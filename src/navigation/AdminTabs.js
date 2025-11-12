// src/navigation/AdminTabs.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Telas do admin
import TabIcon from '../components/navigation/TabIcon';
import CadastrarPorta from '../screens/admin/CadastrarPorta';
import CadastrarUsuario from '../screens/admin/CadastrarUsuario';
import HistoricoPortas from '../screens/admin/HistoricoPortas';
import HomeAdmin from '../screens/admin/HomeAdmin';

const Tab = createBottomTabNavigator();

const LABEL_STYLE = {
  fontSize: 12,
  fontWeight: '700',
  letterSpacing: 0.3,
  textTransform: 'none',
};

export default function AdminTabs() {
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
        tabBarActiveTintColor: '#38BDF8',
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
        name="HomeAdmin"
        component={HomeAdmin}
        options={{
          title: 'Início',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Início</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CadastrarUsuario"
        component={CadastrarUsuario}
        options={{
          title: 'Usuários',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Usuários</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person-add" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CadastrarPorta"
        component={CadastrarPorta}
        options={{
          title: 'Portas',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Portas</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="key" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoricoPortas"
        component={HistoricoPortas}
        options={{
          title: 'Histórico',
          tabBarLabel: ({ color }) => (
            <Text style={[LABEL_STYLE, { color, marginTop: 8 }]}>Histórico</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="time" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
