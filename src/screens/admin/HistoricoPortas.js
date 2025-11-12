// src/screens/admin/HistoricoPortas.js
import { Picker } from '@react-native-picker/picker';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const historicoMock = [
  { id: '1', porta: 'Laboratório 3', usuario: 'Thiago', data: '2025-10-15T21:00:00', status: 'Concluída' },
  { id: '2', porta: 'Sala 103', usuario: 'Milena', data: '2025-10-12T19:00:00', status: 'Cancelada' },
  { id: '3', porta: 'Laboratório 11', usuario: 'João', data: '2025-10-14T21:00:00', status: 'Ativa' },
];

export default function HistoricoPortas({ route }) {
  const isAdmin = route?.params?.isAdmin ?? true; // valida se é admin (mockado como true)
  
  // se não for admin → bloqueia
  if (!isAdmin) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>Acesso restrito aos administradores.</Text>
      </View>
    );
  }

  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [ordenacao, setOrdenacao] = useState('recent');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const filterAnim = useRef(new Animated.Value(0)).current;
  const sortAnim = useRef(new Animated.Value(0)).current;
  const filterButtonScale = useRef(new Animated.Value(1)).current;
  const sortButtonScale = useRef(new Animated.Value(1)).current;

  const filtrarPorPeriodo = (data, periodo) => {
    const hoje = new Date();
    const diff = hoje - data;
    const diaMs = 24 * 60 * 60 * 1000;

    switch (periodo) {
      case 'today':
        return data.toDateString() === hoje.toDateString();
      case '7days':
        return diff <= 7 * diaMs;
      case '30days':
        return diff <= 30 * diaMs;
      default:
        return true;
    }
  };

  const ordenarHistorico = (data) => {
    const createStatusSorter = (status) => (a, b) => {
      const aMatch = a.status === status;
      const bMatch = b.status === status;

      if (aMatch === bMatch) {
        return new Date(b.data) - new Date(a.data);
      }

      return aMatch ? -1 : 1;
    };

    const sorters = {
      recent: (a, b) => new Date(b.data) - new Date(a.data),
      nome: (a, b) => {
        const compare = a.usuario.localeCompare(b.usuario, 'pt-BR');
        return compare !== 0 ? compare : new Date(b.data) - new Date(a.data);
      },
      laboratorio: (a, b) => {
        const compare = a.porta.localeCompare(b.porta, 'pt-BR');
        return compare !== 0 ? compare : new Date(b.data) - new Date(a.data);
      },
      statusAtiva: createStatusSorter('Ativa'),
      statusConcluida: createStatusSorter('Concluída'),
      statusCancelada: createStatusSorter('Cancelada'),
    };

    const sorter = sorters[ordenacao] ?? sorters.recent;
    return [...data].sort(sorter);
  };

  // aplica filtros e ordenação
  const historicoFiltrado = useMemo(() => {
    const filtrado = historicoMock.filter((item) => {
      const dataItem = new Date(item.data);
        return (
          (filtroUsuario ? item.usuario.toLowerCase().includes(filtroUsuario.toLowerCase()) : true) &&
        (filtroStatus ? item.status === filtroStatus : true) &&
        (filtroPeriodo ? filtrarPorPeriodo(dataItem, filtroPeriodo) : true)
      );
    });

    return ordenarHistorico(filtrado);
  }, [filtroUsuario, filtroStatus, filtroPeriodo, ordenacao]);

  const closeMenus = () => {
    setShowFilterMenu(false);
    setShowSortMenu(false);
  };

  useEffect(() => {
    if (showFilterMenu) {
      filterAnim.setValue(0);
      Animated.timing(filterAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterMenu, filterAnim]);

  useEffect(() => {
    if (showSortMenu) {
      sortAnim.setValue(0);
      Animated.timing(sortAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [showSortMenu, sortAnim]);

  const handleButtonPressIn = (type) => {
    const target = type === 'filter' ? filterButtonScale : sortButtonScale;
    Animated.spring(target, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 5,
      tension: 160,
    }).start();
  };

  const handleButtonPressOut = (type) => {
    const target = type === 'filter' ? filterButtonScale : sortButtonScale;
    Animated.spring(target, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 140,
    }).start();
  };

  return (
    <View style={styles.container}>
      {(showFilterMenu || showSortMenu) && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: (showFilterMenu ? filterAnim : sortAnim).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={closeMenus} />
        </Animated.View>
      )}

      <View style={styles.header}>
      <Text style={styles.title}>Histórico de Portas</Text>
        <Text style={styles.subtitle}>
          Acompanhe as movimentações recentes e aplique filtros para encontrar registros específicos.
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <View style={[styles.actionWrapper, styles.actionWrapperFilter]}>
          <Animated.View
            style={[
              styles.actionAnimatedWrapper,
              { transform: [{ scale: filterButtonScale }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, showFilterMenu && styles.actionButtonActive]}
              activeOpacity={0.85}
              onPressIn={() => handleButtonPressIn('filter')}
              onPressOut={() => handleButtonPressOut('filter')}
              onPress={() => {
                setShowFilterMenu((prev) => !prev);
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.actionButtonText}>Filtro</Text>
            </TouchableOpacity>
          </Animated.View>

          {showFilterMenu && (
            <Animated.View
              style={[
                styles.popover,
                {
                  opacity: filterAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: filterAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 0],
                      }),
                    },
                    {
                      scale: filterAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.98, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.popoverTitle}>Filtrar registros</Text>
              <Text style={styles.popoverSubtitle}>
                Ajuste os critérios abaixo para refinar os resultados exibidos.
              </Text>

              <View style={styles.popoverSection}>
                <Text style={styles.popoverLabel}>Usuário</Text>
        <TextInput
                  style={styles.popoverInput}
                  placeholder="Nome ou parte do nome"
                  placeholderTextColor="rgba(148, 163, 184, 0.7)"
          value={filtroUsuario}
          onChangeText={setFiltroUsuario}
        />
              </View>

              <View style={styles.popoverSection}>
                <Text style={styles.popoverLabel}>Status</Text>
                <View style={styles.popoverSelect}>
                  <Picker
                    selectedValue={filtroStatus}
                    onValueChange={(itemValue) => setFiltroStatus(itemValue)}
                    dropdownIconColor="#38BDF8"
                    style={styles.popoverPicker}
                  >
                    <Picker.Item label="Todos" value="" color="#F8FAFC" />
                    <Picker.Item label="Ativa" value="Ativa" color="#F8FAFC" />
                    <Picker.Item label="Concluída" value="Concluída" color="#F8FAFC" />
                    <Picker.Item label="Cancelada" value="Cancelada" color="#F8FAFC" />
                  </Picker>
                </View>
              </View>

              <View style={styles.popoverSection}>
                <Text style={styles.popoverLabel}>Período</Text>
                <View style={styles.popoverSelect}>
                  <Picker
                    selectedValue={filtroPeriodo}
                    onValueChange={(itemValue) => setFiltroPeriodo(itemValue)}
                    dropdownIconColor="#38BDF8"
                    style={styles.popoverPicker}
                  >
                    <Picker.Item label="Todos" value="" color="#F8FAFC" />
                    <Picker.Item label="Hoje" value="today" color="#F8FAFC" />
                    <Picker.Item label="Últimos 7 dias" value="7days" color="#F8FAFC" />
                    <Picker.Item label="Últimos 30 dias" value="30days" color="#F8FAFC" />
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                style={styles.popoverClearButton}
                onPress={() => {
                  setFiltroUsuario('');
                  setFiltroStatus('');
                  setFiltroPeriodo('');
                }}
              >
                <Text style={styles.popoverClearText}>Limpar filtros</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        <View style={[styles.actionWrapper, styles.actionWrapperSort]}>
          <Animated.View
            style={[
              styles.actionAnimatedWrapper,
              { transform: [{ scale: sortButtonScale }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, showSortMenu && styles.actionButtonActive]}
              activeOpacity={0.85}
              onPressIn={() => handleButtonPressIn('sort')}
              onPressOut={() => handleButtonPressOut('sort')}
              onPress={() => {
                setShowSortMenu((prev) => !prev);
                setShowFilterMenu(false);
              }}
            >
              <Text style={styles.actionButtonText}>Ordenar por</Text>
            </TouchableOpacity>
          </Animated.View>

          {showSortMenu && (
            <Animated.View
              style={[
                styles.popover,
                {
                  opacity: sortAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: sortAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 0],
                      }),
                    },
                    {
                      scale: sortAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.98, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.popoverTitle}>Ordenar registros</Text>
              <Text style={styles.popoverSubtitle}>
                Escolha um critério de ordenação para reorganizar a lista.
              </Text>

              {[
                { label: 'Mais recentes', value: 'recent' },
                { label: 'Nome do usuário', value: 'nome' },
                { label: 'Laboratório / Sala', value: 'laboratorio' },
                { label: 'Status: Ativas', value: 'statusAtiva' },
                { label: 'Status: Concluídas', value: 'statusConcluida' },
                { label: 'Status: Canceladas', value: 'statusCancelada' },
              ].map((option) => {
                const isActive = ordenacao === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.sortOption, isActive && styles.sortOptionActive]}
                    activeOpacity={0.85}
                    onPress={() => {
                      setOrdenacao(option.value);
                      setShowSortMenu(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        isActive && styles.sortOptionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          )}
        </View>
      </View>

      {/* Lista */}
      {historicoFiltrado.length === 0 ? (
        <Text style={styles.noRecords}>Nenhum registro encontrado.</Text>
      ) : (
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => {
            const dataHora = new Date(item.data).toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            return (
              <View style={styles.card}>
                <Text style={styles.porta}>{item.porta}</Text>
                <Text style={styles.info}>Usuário: <Text style={styles.infoHighlight}>{item.usuario}</Text></Text>
                <Text style={styles.info}>Data/Hora: <Text style={styles.infoHighlight}>{dataHora}</Text></Text>
                <Text
                  style={[
                    styles.status,
                  item.status === 'Ativa' ? styles.statusAtiva :
                  item.status === 'Concluída' ? styles.statusConcluida :
                  styles.statusCancelada
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            );
          }}
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
    paddingTop: 32,
    paddingBottom: 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 17, 32, 0.55)',
    zIndex: 5,
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    marginBottom: 16,
  },
  title: { 
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(148, 163, 184, 0.85)',
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 50,
    elevation: 30,
    paddingHorizontal: 12,
  },
  actionWrapper: {
    position: 'relative',
    zIndex: 30,
  },
  actionWrapperFilter: {
    marginRight: 8,
  },
  actionWrapperSort: {
    marginLeft: 8,
  },
  actionAnimatedWrapper: {
    borderRadius: 18,
  },
  actionButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonActive: {
    borderColor: 'rgba(56, 189, 248, 0.55)',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  actionButtonText: {
    color: '#E2E8F0',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  popover: {
    position: 'absolute',
    top: 54,
    left: 0,
    minWidth: 240,
    maxWidth: 280,
    backgroundColor: '#10192C',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
    zIndex: 40,
  },
  popoverTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  popoverSubtitle: {
    marginTop: 6,
    marginBottom: 14,
    color: 'rgba(148, 163, 184, 0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  popoverSection: {
    marginBottom: 14,
  },
  popoverLabel: {
    color: 'rgba(226, 232, 240, 0.9)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  popoverInput: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    color: '#E2E8F0',
    fontSize: 15,
  },
  popoverSelect: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    overflow: 'hidden',
  },
  popoverPicker: {
    color: '#F8FAFC',
  },
  popoverClearButton: {
    alignSelf: 'flex-end',
    paddingTop: 4,
  },
  popoverClearText: {
    color: '#38BDF8',
    fontWeight: '600',
    fontSize: 13,
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    marginBottom: 10,
  },
  sortOptionActive: {
    borderColor: 'rgba(34, 197, 94, 0.6)',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
  },
  sortOptionText: {
    color: 'rgba(226, 232, 240, 0.86)',
    fontSize: 15,
    fontWeight: '600',
  },
  sortOptionTextActive: {
    color: '#22C55E',
  },
  list: {
    zIndex: 0,
    elevation: 0,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  porta: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: 'rgba(203, 213, 225, 0.85)',
    marginBottom: 4,
  },
  infoHighlight: {
    color: '#F8FAFC',
    fontWeight: '600',
  },
  status: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 14,
  },
  statusAtiva: {
    color: '#38BDF8',
  },
  statusConcluida: {
    color: '#22C55E',
  },
  statusCancelada: {
    color: '#F97316',
  },
  noRecords: {
    textAlign: 'center',
    color: 'rgba(148, 163, 184, 0.85)',
    marginTop: 20,
    fontSize: 16,
  },
  blockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  blockedText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
