import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Note, getAllNotes, searchNotes } from "../lib/storage";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [search])
  );

  const loadNotes = async () => {
    const result = search ? await searchNotes(search) : await getAllNotes();
    setNotes(result);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const handleNotePress = (note: Note) => {
    router.push({ pathname: "/note", params: { id: note.id } });
  };

  const handleNewNote = () => {
    router.push("/note");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SearchBar value={search} onChangeText={handleSearch} />

      {notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyText}>
            {search ? "No notes found" : "No notes yet"}
          </Text>
          <Text style={styles.emptyHint}>
            {search ? "Try a different search" : "Tap the + button to create one"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={handleNotePress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewNote}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  list: {
    paddingBottom: 100,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 18,
    color: "#999999",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 40,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#4A90D9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "300",
    marginTop: -2,
  },
});
