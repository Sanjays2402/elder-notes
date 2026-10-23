# Elder Notes 📝

A simple, accessible note-taking app designed for elderly users.

## Features

- ✅ Create, edit, and delete notes
- ✅ Search notes
- ✅ Auto-save (every 3 seconds)
- ✅ Large fonts and big tap targets
- ✅ High contrast, clean design
- ✅ No account needed — all data stored locally
- ✅ **Dark Mode** — Toggle dark/light mode in Settings, persisted across sessions
- ✅ **Note Colors** — Color-label notes (red, blue, green, yellow, purple) with a colored strip on each card
- ✅ **Pin Notes** — Pin important notes to the top of the list
- ✅ **Font Size Control** — Choose Small / Medium / Large / Extra Large in Settings
- ✅ **Haptic Feedback** — Tactile confirmation when saving or deleting notes
- ✅ **Note Count Badge** — Total note count displayed in the home screen header
- ✅ **Relative Timestamps** — "Edited 2 hours ago" style timestamps on note cards

## Design Principles

- 🔤 Large fonts (18-28px, adjustable)
- 🎯 Big tap targets (48px+ buttons)
- 🎨 High contrast colors in both light and dark mode
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
- Expo Haptics (tactile feedback)

## Project Structure

```
elder-notes/
├── app/
│   ├── _layout.tsx      # Navigation layout with SettingsProvider
│   ├── index.tsx        # Home screen (note list + search + note count)
│   ├── note.tsx         # Create/Edit note screen (color picker, pin toggle)
│   └── settings.tsx     # Settings screen (dark mode, font size)
├── components/
│   ├── NoteCard.tsx     # Note card with color strip, pin icon, relative time
│   └── SearchBar.tsx    # Search bar component
├── lib/
│   ├── storage.ts       # AsyncStorage CRUD operations (color, pinned fields)
│   ├── settings.ts      # Settings context (dark mode, font size)
│   └── timeUtils.ts     # Relative timestamp utility
└── assets/              # App icons and splash screen
```

## Built with 🥔

## Terms & Disclaimer

By using this project you agree to the following.

- **No warranty.** This software is provided "as is", without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
- **No liability.** To the maximum extent permitted by law, the author and contributors are not liable for any claim, loss, or damage (direct, indirect, incidental, or consequential, including lost data or profits) arising from its use.
- **Your responsibility.** You use it at your own risk and are responsible for complying with the laws that apply to you.
- **Your data.** Keep backups; data loss is possible. If you process other people's personal information, you are responsible for complying with privacy laws such as US state privacy laws (e.g. CCPA), PIPEDA and Quebec's Law 25 (Canada), and the Digital Personal Data Protection Act, 2023 (India).
- Accessibility features are a best effort and are not certified against accessibility standards or laws (ADA, AODA/ACA, or India's Rights of Persons with Disabilities Act, 2016).
- **Third parties.** Names, logos, APIs, and services of others belong to their owners and are used for identification only; no affiliation or endorsement is implied.
- **Your statutory rights.** Nothing here limits rights that cannot be waived by agreement, including under consumer-protection laws in the USA, Canada (including Quebec), and India (Consumer Protection Act, 2019).
- **License.** Use, copying, and distribution are governed by the [LICENSE](LICENSE) file; if anything here conflicts with it, the license controls.
