import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { getNote, saveNote, deleteNote } from "../lib/storage";

export default function NoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isExisting, setIsExisting] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noteId = useRef<string | undefined>(id);

  useEffect(() => {
    if (id) {
      loadNote(id);
    }
  }, [id]);

  // Auto-save every 3 seconds after changes
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    if (title || body) {
      autoSaveTimer.current = setTimeout(async () => {
        const saved = await saveNote(title, body, noteId.current);
        noteId.current = saved.id;
        setIsExisting(true);
      }, 3000);
    }

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [title, body]);

  const loadNote = async (noteId: string) => {
    const note = await getNote(noteId);
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsExisting(true);
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      Alert.alert("Empty Note", "Please write something before saving.");
      return;
    }
    await saveNote(title, body, noteId.current);
    router.back();
  };

  const handleDelete = () => {
    if (!noteId.current) {
      router.back();
      return;
    }

    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(noteId.current!);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isExisting ? "Edit Note" : "New Note",
          headerRight: () => (
            <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
              <Text style={styles.headerBtnText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#AAAAAA"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            autoFocus={!isExisting}
          />

          <TextInput
            style={styles.bodyInput}
            placeholder="Write your note here..."
            placeholderTextColor="#AAAAAA"
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </ScrollView>

        {isExisting && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteBtnText}>🗑️  Delete Note</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerBtnText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  bodyInput: {
    fontSize: 20,
    color: "#333333",
    lineHeight: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    minHeight: 300,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  deleteBtn: {
    margin: 20,
    marginBottom: 40,
    backgroundColor: "#FF4444",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
});
