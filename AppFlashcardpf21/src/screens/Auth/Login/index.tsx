import React, { useState } from "react";
import { Container } from "./styles"
import { HeaderDefault } from "../../../components/Header/HeaderDefault"
import { TextInput } from 'react-native-paper';
import { ButtonDefault } from "../../../components/Button/ButtonDefault";
import { useTheme } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { Dialog, Portal, Text, Button } from 'react-native-paper';



export function Login() {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [text, setText] = useState('');
  const [secureText, setSecureText] = useState(true);

  const theme = useTheme();

  const showDialog = (message: string) => {
    setErrorMessage(message);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  function signUp() {
    if (!email.trim() || !password.trim()) {
      setTitleErrorMessage('E-mail/Senha')
      showDialog('Favor, insira seu e-mail e senha.');
      return;
    }
    if (password !== passwordRepeat) {
      setTitleErrorMessage('Senha')
      showDialog('As senhas não correspondem.');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth().currentUser;
        const newUser = { name: email, email };
        firestore().collection('Users').doc(currentUser?.uid).set(newUser);
      })
      .catch(handleAuthError);
  }

  function signIn() {
    if (!email.trim() || !password.trim()) {
      setTitleErrorMessage('E-mail/Senha')
      showDialog('Por favor, insira seu e-mail e senha.');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(handleAuthError);
  }

  function toggleMode() {
    setIsSignUpMode(prevState => !prevState);
  }

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  function handleAuthError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setTitleErrorMessage('E-mail')
        showDialog('O endereço de e-mail já está em uso.');
        break;
      case 'auth/invalid-email':
        setTitleErrorMessage('E-mail')
        showDialog('O endereço de e-mail é inválido.');
        break;
      case 'auth/weak-password':
        setTitleErrorMessage('Senha')
        showDialog('A senha é muito fraca.');
        break;
      case 'auth/invalid-credential':
        setTitleErrorMessage('Senha')
        showDialog('Senha incorreta.');
        break;
      case 'auth/user-not-found':
        setTitleErrorMessage('Usuário')
        showDialog('Usuário não encontrado.');
        break;
      default:
        setTitleErrorMessage('Erro')
        showDialog('Ocorreu um erro inesperado.');
    }
  }

  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{titleErrorMessage}</Dialog.Title>
            <Dialog.Content>
              <Text>{errorMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>

      <HeaderDefault title={isSignUpMode ? 'Criar Conta' : 'Login'} />
      <TextInput
        label="Email" style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}
        onChangeText={setEmail}
      />
      <TextInput
        label="Senha" style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}
        secureTextEntry={secureText}
        right={<TextInput.Icon
          icon={secureText ? 'eye-off' : 'eye'}
          onPress={toggleSecureText}
        />}
        onChangeText={setPassword}
      />
      {isSignUpMode && (
        <>
          <TextInput
            label=" Repetir Senha" style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}
            secureTextEntry={secureText}
            right={<TextInput.Icon
              icon={secureText ? 'eye-off' : 'eye'}
              onPress={toggleSecureText}
            />}
            onChangeText={setPasswordRepeat}
          />
        </>
      )}
      {isSignUpMode ? (
        <ButtonDefault iconName="send" title="Criar Conta" onPressButton={signUp} />
      ) : (
        <ButtonDefault iconName="send" title="Entrar" onPressButton={signIn} />
      )}
      <Chip icon="account" onPress={toggleMode} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>{isSignUpMode ? 'Entrar' : 'Criar Conta'}</Chip>
    </Container>
  )
}