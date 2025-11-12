// src/screens/admin/CadastrarPorta.js
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

export default function CadastrarPorta() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');

  const handleCadastrar = async () => {
    if (!nome) return Alert.alert('Erro', 'Nome é obrigatório');
    const res = await api.cadastrarSala({ nome, descricao, nivelAcesso });
    if (res.success) Alert.alert('Sucesso', 'Sala cadastrada');
    else Alert.alert('Erro', 'Falha ao cadastrar');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro de Portas</Text>
          <Text style={styles.subtitle}>
            Configure novas portas e defina níveis de acesso para os ambientes.
          </Text>
        </View>

        <View style={styles.card}>
          <Input
            label="Número da Porta"
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Sala 101"
          />
          <Input
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Informe a finalidade ou localização"
          />
          <Input
            label="Nível de acesso"
            value={nivelAcesso}
            onChangeText={setNivelAcesso}
            placeholder="Ex: 0, 1, 2"
          />

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
