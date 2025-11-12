import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) {
    return undefined;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function TabIcon({ name, color, focused }) {
  const activeBackground = focused ? hexToRgba(color, 0.18) ?? 'rgba(56, 189, 248, 0.18)' : undefined;
  const activeBorder = focused ? hexToRgba(color, 0.55) ?? 'rgba(56, 189, 248, 0.55)' : undefined;
  const activeShadow = focused ? hexToRgba(color, 0.45) ?? 'rgba(56, 189, 248, 0.45)' : '#000';

  return (
    <View
      style={[
        styles.wrapper,
        focused && {
          backgroundColor: activeBackground,
          borderColor: activeBorder,
          shadowColor: activeShadow,
        },
      ]}
    >
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.22)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
});


