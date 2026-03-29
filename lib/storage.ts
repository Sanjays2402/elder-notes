import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

const NOTES_KEY = "elder_notes";

const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

export async function getAllNotes(): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  if (!raw) return [];
  const notes: Note[] = JSON.parse(raw);
  return notes.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getNote(id: string): Promise<Note | undefined> {
  const notes = await getAllNotes();
  return notes.find((n) => n.id === id);
}

export async function saveNote(
  title: string,
  body: string,
  existingId?: string
): Promise<Note> {
  const notes = await getAllNotes();
  const now = Date.now();

  if (existingId) {
    const idx = notes.findIndex((n) => n.id === existingId);
    if (idx !== -1) {
      notes[idx] = { ...notes[idx], title, body, updatedAt: now };
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return notes[idx];
    }
  }

  const note: Note = {
    id: generateId(),
    title: title || "Untitled",
    body,
    createdAt: now,
    updatedAt: now,
  };
  notes.push(note);
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return note;
}

export async function deleteNote(id: string): Promise<void> {
  const notes = await getAllNotes();
  const filtered = notes.filter((n) => n.id !== id);
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
}

export async function searchNotes(query: string): Promise<Note[]> {
  const notes = await getAllNotes();
  const q = query.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
  );
}
