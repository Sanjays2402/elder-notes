import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useSettings } from "../lib/settings";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  const { theme, fontScale } = useSettings();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            color: theme.text,
            fontSize: 20 * fontScale,
          },
        ]}
        placeholder="🔍  Search notes..."
        placeholderTextColor={theme.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
