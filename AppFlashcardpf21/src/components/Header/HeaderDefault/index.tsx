import React from "react";
import { Text, View } from "react-native";
import { Container } from "./styles"
import { Appbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

type Props = {
  title: string;
}
export function HeaderDefault({title}: Props) {
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  const theme = useTheme();

  return (
      <Appbar.Header mode="center-aligned" style={{backgroundColor: theme.colors.background}}>
        <Appbar.Content title={title} />
      </Appbar.Header>
  )
}