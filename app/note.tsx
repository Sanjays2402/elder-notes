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
import { getNote, saveNote, deleteNote, NoteColor } from "../lib/storage";
import { useSettings } from "../lib/settings";
import * as Haptics from "expo-haptics";

const NOTE_COLORS: { value: NoteColor; hex: string; label: string }[] = [
  { value: "none", hex: "transparent", label: "None" },
  { value: "red", hex: "#E53935", label: "Red" },
  { value: "blue", hex: "#1E88E5", label: "Blue" },
  { value: "green", hex: "#43A047", label: "Green" },
  { value: "yellow", hex: "#FDD835", label: "Yellow" },
  { value: "purple", hex: "#8E24AA", label: "Purple" },
];

export default function NoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { theme, fontScale } = useSettings();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState<NoteColor>("none");
  const [pinned, setPinned] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noteId = useRef<string | undefined>(id);

  useEffect(() => {
    if (id) loadNote(id);
  }, [id]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    if (title || body) {
      autoSaveTimer.current = setTimeout(async () => {
        const saved = await saveNote(title, body, noteId.current, color, pinned);
        noteId.current = saved.id;
        setIsExisting(true);
      }, 3000);
    }

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [title, body, color, pinned]);

  const loadNote = async (id: string) => {
    const note = await getNote(id);
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setColor(note.color ?? "none");
      setPinned(note.pinned ?? false);
      setIsExisting(true);
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      Alert.alert("Empty Note", "Please write something before saving.");
      return;
    }
    await saveNote(title, body, noteId.current, color, pinned);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(noteId.current!);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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
              <Text style={[styles.headerBtnText, { fontSize: 20 * fontScale }]}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.bg }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Color Picker */}
          <View style={styles.colorRow}>
            <Text style={[styles.label, { color: theme.textSecondary, fontSize: 16 * fontScale }]}>
              Color:
            </Text>
            {NOTE_COLORS.map((c) => (
              <TouchableOpacity
                key={c.value}
                onPress={() => setColor(c.value)}
                style={[
                  styles.colorDot,
                  {
                    backgroundColor: c.value === "none" ? theme.card : c.hex,
                    borderColor: color === c.value ? theme.text : theme.border,
                    borderWidth: color === c.value ? 3 : 1,
                  },
                ]}
                accessibilityLabel={c.label}
              />
            ))}
          </View>

          {/* Pin Toggle */}
          <TouchableOpacity
            style={[styles.pinBtn, { backgroundColor: pinned ? theme.primary : theme.card, borderColor: theme.border }]}
            onPress={() => setPinned(!pinned)}
            activeOpacity={0.7}
          >
            <Text style={[styles.pinText, { color: pinned ? "#FFFFFF" : theme.text, fontSize: 18 * fontScale }]}>
              📌 {pinned ? "Pinned" : "Pin this note"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[
              styles.titleInput,
              {
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border,
                fontSize: 28 * fontScale,
              },
            ]}
            placeholder="Title"
            placeholderTextColor={theme.textMuted}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            autoFocus={!isExisting}
          />

          <TextInput
            style={[
              styles.bodyInput,
              {
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border,
                fontSize: 20 * fontScale,
              },
            ]}
            placeholder="Write your note here..."
            placeholderTextColor={theme.textMuted}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </ScrollView>

        {isExisting && (
          <TouchableOpacity
            style={[styles.deleteBtn, { backgroundColor: theme.danger }]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={[styles.deleteBtnText, { fontSize: 20 * fontScale }]}>
              🗑️  Delete Note
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "600",
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  label: {
    fontWeight: "600",
    marginRight: 4,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  pinBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  pinText: {
    fontWeight: "600",
  },
  titleInput: {
    fontWeight: "700",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  bodyInput: {
    lineHeight: 30,
    borderRadius: 14,
    padding: 20,
    minHeight: 300,
    borderWidth: 1,
  },
  deleteBtn: {
    margin: 20,
    marginBottom: 40,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
