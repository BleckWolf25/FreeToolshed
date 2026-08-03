# FreeToolshed - Developer Utilities Suite

**FreeToolshed** is a lightweight, zero-ad, client-side only developer utility suite offering essential tools for data transformation, encoding, validation, and generation — with no backend server dependencies.

---

## Features

- **100% Client-Side**: All parsing, encoding, hashing, and rendering is done entirely inside your browser. No server calls, data leakage, or external logging.
- **25 Developer Tools**: Complete toolset spanning Mathematics, JSON formatting, Base64 encoding, JWT parsing, Regex testing, Hash generation, QR Code creation, Diff checking, and more.
- **Ant Design Vue UI**: Clean, modern interface with native Dark/Light mode theme switching.
- **Global Search Modal**: Instant search across all tools via `Cmd+K` / `Ctrl+K` hotkey.
- **Offline & Offline Ready**: Fast page loads powered by Vite bundling.

---

## Tool Directory

### Tier 1: Essential Tools

1. **JSON Formatter & Validator**: Format, minify, validate, and inspect JSON documents.
2. **Base64 Encoder & Decoder**: Convert text & binary files to Base64 data URIs.
3. **URL Encoder & Decoder**: Encode/decode URLs and inspect query parameter tables.
4. **Text Case Converter**: Transform text across 8 casing styles (camelCase, snake_case, etc.).
5. **Strong Password Generator**: Configurable length, character sets, and entropy score.
6. **Hash Generator**: MD5, SHA-1, SHA-256, and SHA-512 checksums for text/files.

### Tier 2: High Value Tools

1. **JWT Token Decoder**: Decode headers & payloads with expiration status checking.
2. **UUID / GUID Generator**: Bulk generate RFC4122 compliant UUID v1 and v4 IDs.
3. **Regex Tester & Evaluator**: Real-time regex testing with flag toggles and pattern cheat sheet.
4. **Markdown to HTML Converter**: GFM Markdown live editor & HTML renderer.
5. **Color Code Converter**: HEX, RGB, HSL conversions + WCAG contrast ratio analyzer.
6. **QR Code Generator**: Create customizable QR codes and export PNG/SVG files.
7. **Code Minifier**: Minify & compress JSON, CSS, and JavaScript source code.
8. **Text Diff Comparison**: Highlight text additions and deletions side-by-side.

### Tier 3: Specialized Utilities

1. **Cron Expression Explainer**: Human-readable cron schedule descriptions & upcoming dates.
2. **Unix Timestamp Converter**: Epoch seconds/ms ticker and bi-directional date converter.
3. **YAML / JSON Parser**: Convert seamlessly between YAML and JSON formats.
4. **CSV to JSON Converter**: Parse CSV spreadsheets to JSON arrays with data table preview.
5. **Image Metadata / EXIF Viewer**: Inspect resolution, MIME type, and EXIF camera metadata.
6. **Morse Code Translator**: Text to Morse code with Web Audio API sound playback.
7. **ASCII Art Text Generator**: Render text banners using FIGlet fonts.

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: `pnpm` (recommended) or `npm`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/FreeToolshed.git
cd FreeToolshed

# Install dependencies
pnpm install
```

### Development Server

```bash
# Run local dev server with HMR at http://localhost:3000
pnpm dev
```

### Production Build

```bash
# Compile optimized production bundle into /dist
pnpm build

# Preview production build locally
pnpm preview
```

## License

Distributed under the MIT License. Author: **BleckWolf25**.
