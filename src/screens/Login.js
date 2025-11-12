import { useRef, useState } from 'react';
import {
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const handleLogin = () => {
    if (email === 'admin' && senha === '123') {
      navigation.replace('AdminMain'); // Direciona para as tabs do admin
    } else if (email === 'usuario' && senha === '123') {
      navigation.replace('UserMain'); // Direciona para as tabs do usuário
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobTopLeft]} />
        <View style={[styles.blob, styles.blobBottomRight]} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.logoWrapper}>
          <Image source={require('../../assets/images/logo.jpeg')} style={styles.logo} />
        </View>

        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Acesse sua conta para gerenciar as reservas</Text>

        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="rgba(148, 163, 184, 0.7)"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, focusedField === 'email' && styles.inputFocused]}
            keyboardType="email-address"
            autoCapitalize="none"
            selectionColor="#22C55E"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />

          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="rgba(148, 163, 184, 0.7)"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={[styles.input, focusedField === 'senha' && styles.inputFocused]}
            selectionColor="#22C55E"
            onFocus={() => setFocusedField('senha')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.forgotPassword}>
          Esqueceu a senha? <Text style={styles.link}>Redefinir</Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    position: 'relative',
  },
  backgroundDecor: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(56, 189, 248, 0.35)',
  },
  blobTopLeft: {
    top: -90,
    left: -60,
    backgroundColor: 'rgba(99, 102, 241, 0.42)',
  },
  blobBottomRight: {
    bottom: -120,
    right: -80,
    backgroundColor: 'rgba(16, 185, 129, 0.38)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 12,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 80,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(226, 232, 240, 0.7)',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 28,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    color: '#E2E8F0',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 20,
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 14,
  },
  link: {
    color: '#38BDF8',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
