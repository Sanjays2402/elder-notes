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
import { useSettings } from "../lib/settings";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import { Stack } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { theme, fontScale } = useSettings();
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

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Notes",
          headerRight: () => (
            <View style={styles.headerRight}>
              <View style={[styles.badge, { backgroundColor: theme.bg }]}>
                <Text style={[styles.badgeText, { color: theme.text, fontSize: 16 * fontScale }]}>
                  {notes.length}
                </Text>
              </View>
              <TouchableOpacity onPress={handleSettings} style={styles.settingsBtn}>
                <Text style={styles.settingsIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <StatusBar barStyle={theme.statusBar} />

        <SearchBar value={search} onChangeText={handleSearch} />

        {notes.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary, fontSize: 24 * fontScale }]}>
              {search ? "No notes found" : "No notes yet"}
            </Text>
            <Text style={[styles.emptyHint, { color: theme.textMuted, fontSize: 18 * fontScale }]}>
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
          style={[styles.fab, { backgroundColor: theme.primary }]}
          onPress={handleNewNote}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: "center",
  },
  badgeText: {
    fontWeight: "700",
  },
  settingsBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  settingsIcon: {
    fontSize: 24,
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
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyHint: {},
  fab: {
    position: "absolute",
    right: 24,
    bottom: 40,
    width: 72,
    height: 72,
    borderRadius: 36,
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
