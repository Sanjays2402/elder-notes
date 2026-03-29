import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Note } from "../lib/storage";

interface Props {
  note: Note;
  onPress: (note: Note) => void;
}

export default function NoteCard({ note, onPress }: Props) {
  const date = new Date(note.updatedAt);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(note)}
      activeOpacity={0.7}
    >
      <Text style={styles.title} numberOfLines={1}>
        {note.title || "Untitled"}
      </Text>
      <Text style={styles.preview} numberOfLines={2}>
        {note.body || "No content"}
      </Text>
      <Text style={styles.date}>{dateStr}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 6,
  },
  preview: {
    fontSize: 18,
    color: "#555555",
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#999999",
  },
});
