// src/components/form/Button.js
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({
  title,
  onPress,
  disabled,
  style,
  textStyle,
  ...rest
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      {...rest}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(34, 197, 94, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
