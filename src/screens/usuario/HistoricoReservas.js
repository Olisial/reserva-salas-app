import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoricoReservas() {
  const navigation = useNavigation();
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Simula dados (depois substituir pelo Firebase)
  useEffect(() => {
    setTimeout(() => {
      const dadosExemplo = [
        { id: '1', porta: 'Laboratório 5', data: '10/11/2025', horaInicio: '14:00', horaFim: '15:00' },
        { id: '2', porta: 'Sala 103', data: '08/11/2025', horaInicio: '09:30', horaFim: '10:15' },
        { id: '3', porta: 'Laboratório 2', data: '03/11/2025', horaInicio: '18:00', horaFim: '19:30' },
      ];

      // Ordena do mais recente para o mais antigo
      const ordenado = dadosExemplo.sort(
        (a, b) => new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-'))
      );

      setHistorico(ordenado);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVoltar = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleVoltar} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={22} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Reservas</Text>
        <View style={{ width: 40 }} />
      </View>

      {historico.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={48} color="rgba(148, 163, 184, 0.7)" />
          <Text style={styles.emptyTitle}>Nenhum registro</Text>
          <Text style={styles.emptySubtitle}>Você ainda não possui reservas anteriores.</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, gap: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Ionicons name="key-outline" size={16} color="#0F172A" />
                </View>
                <Text style={styles.date}>{item.data}</Text>
              </View>
              <Text style={styles.porta}>{item.porta}</Text>
              <View style={styles.cardRow}>
                <Ionicons name="time-outline" size={18} color="rgba(148, 163, 184, 0.8)" />
                <Text style={styles.hora}>
                  {item.horaInicio} - {item.horaFim}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1120',
  },
  loadingText: {
    marginTop: 12,
    color: 'rgba(148, 163, 184, 0.9)',
    fontSize: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: 'rgba(148, 163, 184, 0.85)',
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    color: 'rgba(203, 213, 225, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  porta: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hora: {
    color: 'rgba(203, 213, 225, 0.85)',
    fontSize: 15,
    fontWeight: '500',
  },
});
