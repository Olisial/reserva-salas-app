import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function ReservarPorta() {
  const navigation = useNavigation();

  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [openSala, setOpenSala] = useState(false);
  const [data, setData] = useState(new Date());
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);
  const [openInicio, setOpenInicio] = useState(false);
  const [openFim, setOpenFim] = useState(false);

  const salasFixas = useMemo(
    () => [
      { label: 'Laboratório 1', value: 'Laboratório 1' },
      { label: 'Laboratório 2', value: 'Laboratório 2' },
      { label: 'Sala 103', value: 'Sala 103' },
      { label: 'Sala Multiuso', value: 'Sala Multiuso' },
    ],
    [],
  );

  const horarios = [
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
  ];

  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isWeb = Platform.OS === 'web';

  const confirmarReserva = () => {
    if (!salaSelecionada || !inicio || !fim) {
      alert('Preencha todos os campos antes de confirmar!');
      return;
    }

    alert(`✅ Reserva confirmada!\n\nSala: ${salaSelecionada}\nData: ${data.toLocaleDateString()}\nHorário: ${inicio} às ${fim}`);
  };

  const handleAbrirCalendario = () => {
    if (isAndroid) {
      try {
        const { DateTimePickerAndroid } = require('@react-native-community/datetimepicker');
        DateTimePickerAndroid.open({
          value: data,
          mode: 'date',
          onChange: (_, selectedDate) => {
            if (selectedDate) setData(selectedDate);
          },
        });
      } catch (error) {
        console.warn('DateTimePickerAndroid indisponível, usando fallback.', error);
        setShowDatePicker(true);
      }
      return;
    }

    if (isWeb) {
      if (typeof document !== 'undefined') {
        const input = document.createElement('input');
        input.type = 'date';
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.style.pointerEvents = 'none';
        input.value = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(
          data.getDate(),
        ).padStart(2, '0')}`;

        const handleChange = (event) => {
          const value = event.target.value;
          if (value) {
            const [year, month, day] = value.split('-').map(Number);
            const selected = new Date(year, month - 1, day);
            if (!Number.isNaN(selected.getTime())) {
              setData(selected);
            }
          }
          if (input.parentNode) {
            input.parentNode.removeChild(input);
          }
        };

        const handleBlur = () => {
          if (input.parentNode) {
            input.parentNode.removeChild(input);
          }
        };

        input.addEventListener('change', handleChange);
        input.addEventListener('blur', handleBlur);
        document.body.appendChild(input);
        input.focus();
        if (typeof input.showPicker === 'function') {
          input.showPicker();
        } else {
          input.click();
        }
      }
      return;
    }

    setShowIOSDatePicker(true); // iOS
  };

  const dropdownAberto = openInicio || openFim;
  const calendarioVisivel = showDatePicker && (isIOS || isWeb);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={22} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova Reserva</Text>
        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.subtitle}>
        Escolha a sala, data e horário para realizar sua nova reserva.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Sala ou laboratório</Text>
        <DropDownPicker
          open={openSala}
          value={salaSelecionada}
          items={salasFixas}
          setOpen={setOpenSala}
          setValue={setSalaSelecionada}
          placeholder="Selecione uma sala"
          placeholderStyle={styles.dropdownPlaceholder}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          listItemContainerStyle={styles.listItem}
          listItemLabelStyle={styles.dropdownText}
          zIndex={4000}
          zIndexInverse={1000}
          listMode="SCROLLVIEW"
          badgeDotColors={['#38BDF8', '#22C55E', '#FBBF24']}
        />

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Data</Text>
        <TouchableOpacity style={styles.dateInput} onPress={handleAbrirCalendario} activeOpacity={0.85}>
          <Ionicons name="calendar-outline" size={20} color="#38BDF8" />
          <Text style={styles.dateText}>{data.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showIOSDatePicker && (
          <DateTimePickerModal
            isVisible={showIOSDatePicker}
            mode="date"
            display={isIOS ? 'spinner' : 'calendar'}
            onConfirm={(selectedDate) => {
              setShowIOSDatePicker(false);
              if (selectedDate) setData(selectedDate);
            }}
            onCancel={() => setShowIOSDatePicker(false)}
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
            buttonTextColorIOS="#22C55E"
          />
        )}

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Horários</Text>

        <View style={styles.timeRow}>
          <View style={{ flex: 1, zIndex: 3000 }}>
            <DropDownPicker
              open={openInicio}
              value={inicio}
              items={horarios}
              setOpen={(v) => {
                setOpenInicio(v);
                if (v) setOpenFim(false);
              }}
              setValue={setInicio}
              placeholder="Início"
              placeholderStyle={styles.dropdownPlaceholder}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              listItemContainerStyle={styles.listItem}
              listItemLabelStyle={styles.dropdownText}
              zIndex={3000}
              zIndexInverse={1000}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              portal={true}
            />
          </View>

          <View style={{ width: 16 }} />

          <View style={{ flex: 1, zIndex: 2000 }}>
            <DropDownPicker
              open={openFim}
              value={fim}
              items={horarios}
              setOpen={(v) => {
                setOpenFim(v);
                if (v) setOpenInicio(false);
              }}
              setValue={setFim}
              placeholder="Término"
              placeholderStyle={styles.dropdownPlaceholder}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              listItemContainerStyle={styles.listItem}
              listItemLabelStyle={styles.dropdownText}
              zIndex={2000}
              zIndexInverse={900}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              portal={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, dropdownAberto && styles.buttonShifted]}
          onPress={confirmarReserva}
          activeOpacity={0.88}
        >
          <Text style={styles.buttonText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
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
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  subtitle: {
    color: 'rgba(148, 163, 184, 0.9)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
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
    shadowRadius: 18,
    elevation: 10,
    overflow: 'visible',
  },
  sectionLabel: {
    color: 'rgba(226, 232, 240, 0.9)',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: 14,
    minHeight: 52,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderColor: 'rgba(148, 163, 184, 0.25)',
    borderRadius: 14,
  },
  dropdownContainerSala: {
    zIndex: 4000,
    elevation: 30,
  },
  dropdownContainerInicio: {
    zIndex: 3000,
    elevation: 26,
  },
  dropdownContainerFim: {
    zIndex: 2500,
    elevation: 24,
  },
  dropdownText: {
    color: '#E2E8F0',
    fontWeight: '500',
  },
  dropdownPlaceholder: {
    color: 'rgba(148, 163, 184, 0.6)',
  },
  listItem: {
    borderBottomColor: 'rgba(148, 163, 184, 0.08)',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dateText: {
    color: '#E2E8F0',
    fontWeight: '600',
    fontSize: 16,
  },
  timeRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 4,
  },
  buttonShifted: {
    marginTop: 200,
  },
  buttonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
