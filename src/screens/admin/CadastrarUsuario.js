// src/screens/admin/CadastrarUsuario.js
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastrar = async () => {
    if (!nome || !cpf || !email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }
    const res = await api.cadastrarUsuario({ nome, cpf, email, senha });
    if (res.success) Alert.alert('Sucesso', 'Usuário cadastrado');
    else Alert.alert('Erro', 'Falha ao cadastrar');
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro de Usuários</Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para adicionar um novo usuário ao sistema.
          </Text>
        </View>

        <View style={styles.card}>
          <Input label="Nome completo" value={nome} onChangeText={setNome} />
          <Input label="CPF" value={cpf} onChangeText={setCpf} />
          <Input label="Email" value={email} onChangeText={setEmail} />
          <Input label="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

          <Button title="Cadastrar" onPress={handleCadastrar} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(148, 163, 184, 0.9)',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
});
