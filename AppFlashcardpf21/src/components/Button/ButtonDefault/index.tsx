import React from "react";
import { Container } from "./styles"
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &{
  iconName: string;
  title: string;
  onPressButton?: () => void;
}

export function ButtonDefault({iconName, title, onPressButton, ...rest}: Props) {
  const theme = useTheme();

  return (
      <Button icon={iconName} mode="elevated"
        onPress={onPressButton}
        buttonColor={theme.colors.onSecondary}
        textColor={theme.colors.onBackground}
        style={{marginTop: 15, marginLeft: 20, marginRight: 20, justifyContent: "center", borderRadius: 15}}
        contentStyle={{ height: 55, }}
        labelStyle={{ 
          fontSize: 18, // Aumentando o tamanho da fonte
          fontWeight: 'bold', // Deixando o texto em negrito
        }}
        >
        {title}
      </Button>
  )
}