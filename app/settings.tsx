import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { Stack } from "expo-router";
import { useSettings, FontSizeOption } from "../lib/settings";

const FONT_OPTIONS: { label: string; value: FontSizeOption }[] = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Extra Large", value: "xlarge" },
];

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode, fontSize, setFontSize, theme, fontScale } =
    useSettings();

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.bg }]}
        contentContainerStyle={styles.content}
      >
        {/* Dark Mode */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 22 * fontScale }]}>
            🌙 Appearance
          </Text>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.text, fontSize: 20 * fontScale }]}>
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#ccc", true: theme.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Font Size */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 22 * fontScale }]}>
            🔤 Font Size
          </Text>
          <View style={styles.fontOptions}>
            {FONT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.fontBtn,
                  {
                    backgroundColor:
                      fontSize === opt.value ? theme.primary : theme.inputBg,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setFontSize(opt.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.fontBtnText,
                    {
                      color: fontSize === opt.value ? "#FFFFFF" : theme.text,
                      fontSize: 18 * fontScale,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.preview, { color: theme.textSecondary, fontSize: 20 * fontScale }]}>
            Preview: This is how your notes will look.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontWeight: "600",
  },
  fontOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  fontBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  fontBtnText: {
    fontWeight: "600",
  },
  preview: {
    fontStyle: "italic",
  },
});
