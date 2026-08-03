# FreeToolshed

> A lightweight, zero-ad, 100% client-side developer utility suite featuring 25+ essential tools for data transformation, encoding, validation, mathematics, and generation — with zero backend server dependencies.

FreeToolshed is a Vue 3 & Vite application providing fast, accessible, and offline-ready developer utilities. All parsing, hashing, conversion, and rendering happen strictly within your browser environment.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.x or higher
- **pnpm** 9.0.0 or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BleckWolf25/FreeToolshed.git
   cd FreeToolshed
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 📝 Available Scripts

- `pnpm dev` - Start the Vite development server
- `pnpm build` - Compile TypeScript types and build the production bundle
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint across the codebase and auto-fix issues
- `pnpm format` - Run Prettier to format the codebase
- `pnpm test:unit` - Run unit tests using Vitest
- `pnpm test:e2e` - Run browser end-to-end tests using Playwright
- `pnpm test` - Run both unit and end-to-end tests
- `pnpm validate` - Run all linting, formatting, build, and test suites

## 🏗️ Project Structure

```zsh
FreeToolshed/
├── dist/                # Production build output (generated)
├── public/              # Static public assets
├── e2e/                 # Playwright end-to-end integration tests
├── src/
│   ├── components/      # UI components (Header, Sidebar, ToolCard, ColorPicker, etc.)
│   ├── composables/     # Reactive business logic & algorithms organized by category
│   ├── router/          # Vue Router configuration and master tools registry
│   ├── styles/          # Global CSS tokens and brutalist Workbench theme styles
│   ├── tools/           # Individual tool components categorized by domain
│   ├── utils/           # Helper functions (storage, validators, converters, etc.)
│   └── views/           # Primary application views (HomeView Pegboard Index)
├── package.json
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── vitest.config.ts     # Vitest configuration
```

## 🧪 Testing

The project uses Vitest for unit tests and Playwright for browser e2e testing.

### Run Unit Tests

```bash
pnpm test:unit
```

### Run End-to-End Tests

```bash
pnpm test:e2e
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [Security Policy](SECURITY.md).

## 📧 Contact

For questions or support, please open an issue on GitHub or contact [joao.coutinho08@gmail.com](mailto:joao.coutinho08@gmail.com).

---

Built with ❤️ using Vue 3, Vite, TypeScript, and Ant Design Vue
