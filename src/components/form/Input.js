// src/components/form/Input.js
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  inputStyle,
  labelStyle,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(148, 163, 184, 0.6)"
        secureTextEntry={secureTextEntry}
        style={[styles.input, inputStyle]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: 'rgba(226, 232, 240, 0.85)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    color: '#E2E8F0',
    fontSize: 16,
    width: '100%',
  },
});
