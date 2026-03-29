# Elder Notes 📝

A simple, accessible note-taking app designed for elderly users.

## Features

- ✅ Create, edit, and delete notes
- ✅ Search notes
- ✅ Auto-save (every 3 seconds)
- ✅ Large fonts and big tap targets
- ✅ High contrast, clean design
- ✅ No account needed — all data stored locally

## Design Principles

- 🔤 Large fonts (18-28px)
- 🎯 Big tap targets (48px+ buttons)
- 🎨 High contrast colors
- 📱 Minimal UI — no clutter
- 🧓 No swipe gestures — only taps

## Screenshots & Test Results

### Notes List
<img src="docs/screenshots/notes-list.png" width="300" alt="Notes List" />

### Create/Edit Note
<img src="docs/screenshots/create-note.png" width="300" alt="Create Note" />

### Test Results

| Test | Result |
|------|--------|
| ✅ Create note | PASSED |
| ✅ Note list display | PASSED |
| ✅ Multiple notes + sorting | PASSED |
| ✅ Auto-save | PASSED |
| ✅ Search/filter | PASSED |
| ✅ Back navigation | PASSED |
| ✅ Delete button appears | PASSED |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Sanjays2402/elder-notes.git
cd elder-notes

# Install dependencies
npm install

# Start the app
npx expo start
```

Then scan the QR code with Expo Go on your phone, or press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## Tech Stack

- React Native (Expo)
- TypeScript
- AsyncStorage (local storage)
- Expo Router (file-based navigation)

## Project Structure

```
elder-notes/
├── app/
│   ├── _layout.tsx      # Navigation layout
│   ├── index.tsx        # Home screen (note list + search)
│   └── note.tsx         # Create/Edit note screen
├── components/
│   ├── NoteCard.tsx     # Note card component
│   └── SearchBar.tsx    # Search bar component
├── lib/
│   └── storage.ts       # AsyncStorage CRUD operations
└── assets/              # App icons and splash screen
```

## Built with 🥔
