import React from "react";
import { Text, View } from "react-native";
import { Container } from "./styles"
import { Appbar } from 'react-native-paper';
import { useTheme  } from 'react-native-paper';

export function Header() {
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  const theme = useTheme();

  return (
    <Container>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: theme.colors.onBackground }} >
        <Appbar.BackAction onPress={_goBack} style={{ backgroundColor: theme.colors.onBackground }} />
        <Appbar.Content title="Login" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
    </Container>
  )
}