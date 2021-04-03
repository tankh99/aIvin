
import { StyleSheet } from "react-native";
import * as theme from './theme';

export const styles = StyleSheet.create({

    header: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 12
    },
    label: {
      fontSize: 12,
      textTransform: "uppercase",
      marginBottom: 6
    },
    inputContainer: {
      marginBottom: 16
    },
    input: {
      backgroundColor: theme.colors.input,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      borderRadius: 5,
      fontSize: theme.sizes.font,
      color: theme.colors.black,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      alignSelf: "stretch"
    },
    formErrorContainer: {
      backgroundColor: theme.colors.lightred,
      borderColor: theme.colors.red,
      borderRadius: 10,
      padding: 12,
      marginBottom: 12
    },
    formError: {
      color: theme.colors.red
    },
    inputError: {
      color: theme.colors.red
    }
  });
