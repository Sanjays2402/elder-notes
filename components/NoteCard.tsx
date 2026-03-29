import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Note, NoteColor } from "../lib/storage";
import { useSettings } from "../lib/settings";
import { getRelativeTime } from "../lib/timeUtils";

interface Props {
  note: Note;
  onPress: (note: Note) => void;
}

const COLOR_MAP: Record<NoteColor, string> = {
  none: "transparent",
  red: "#E53935",
  blue: "#1E88E5",
  green: "#43A047",
  yellow: "#FDD835",
  purple: "#8E24AA",
};

export default function NoteCard({ note, onPress }: Props) {
  const { theme, fontScale } = useSettings();
  const timeAgo = getRelativeTime(note.updatedAt);
  const stripColor = COLOR_MAP[note.color] || "transparent";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={() => onPress(note)}
      activeOpacity={0.7}
    >
      {note.color !== "none" && (
        <View style={[styles.colorStrip, { backgroundColor: stripColor }]} />
      )}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, { color: theme.text, fontSize: 22 * fontScale }]}
            numberOfLines={1}
          >
            {note.pinned ? "📌 " : ""}
            {note.title || "Untitled"}
          </Text>
        </View>
        <Text
          style={[styles.preview, { color: theme.textSecondary, fontSize: 18 * fontScale }]}
          numberOfLines={2}
        >
          {note.body || "No content"}
        </Text>
        <Text style={[styles.date, { color: theme.textMuted, fontSize: 16 * fontScale }]}>
          Edited {timeAgo.toLowerCase() === "just now" ? "just now" : timeAgo.toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  colorStrip: {
    width: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontWeight: "700",
    flex: 1,
  },
  preview: {
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {},
});
