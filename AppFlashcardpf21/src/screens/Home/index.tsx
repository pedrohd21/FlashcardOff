import React from "react";
import { Text, View } from "react-native";
import { Container } from "./styles"
import { useTheme } from 'react-native-paper';
import { HeaderDefault } from "../../components/Header/HeaderDefault";
import auth from "@react-native-firebase/auth"
import { ButtonDefault } from "../../components/Button/ButtonDefault";

export function Home() {
  const theme = useTheme();

  // por enquanto provisortio pra testar
  function signOut() {
    auth().signOut();
  }
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <HeaderDefault title="Flashcards" />
      <ButtonDefault iconName="" title="Sair" onPressButton={signOut}/>
    </Container>
  )
}