# Contributing to FreeToolshed

First off, thank you for taking the time to contribute! Contributions from the community help make FreeToolshed more comprehensive, accurate, and helpful for everyone.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Table of Contents

- [Contributing to FreeToolshed](#contributing-to-freetoolshed)
  - [Table of Contents](#table-of-contents)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Pull Requests](#pull-requests)
  - [Development Setup](#development-setup)
    - [Prerequisites](#prerequisites)
    - [Setting Up Your Workspace](#setting-up-your-workspace)
    - [Development Commands](#development-commands)
  - [Style \& Code Guidelines](#style--code-guidelines)
    - [TypeScript and Vue Coding Style](#typescript-and-vue-coding-style)
    - [Commit Messages](#commit-messages)
  - [Testing](#testing)
    - [Writing Unit Tests](#writing-unit-tests)
  - [Security Vulnerabilities](#security-vulnerabilities)

---

## How Can I Contribute?

### Reporting Bugs

We use structured GitHub Issues to track bug reports. Before submitting a bug report, please:

1. Check the existing issues to ensure it hasn't been reported or resolved already.
2. Test on a clean environment without conflicting browser extensions.
3. Open a bug report including:
   - Application version/commit
   - Browser and OS details
   - Step-by-step instructions to reproduce
   - Console logs from the browser developer tools (`F12 > Console`)

### Suggesting Enhancements

If you have ideas for new tools, formatters, generators, UI improvements, or theme enhancements:

1. Search the issues to verify your suggestion hasn't been discussed before.
2. Open a Feature Request describing the functionality, the problem it solves, and how it might be implemented.

### Pull Requests

To submit code changes:

1. **Fork** the repository and create your branch from `main` (e.g., `feat/your-tool-name` or `fix/issue-description`).
2. Make your changes, keeping them focused. Avoid unrelated changes.
3. Write clean, readable code following our guidelines.
4. Ensure your changes compile and pass all tests and linting checks locally (`pnpm validate`).
5. Submit a Pull Request (PR) with a clear description of the changes and references to any related issues.

---

## Development Setup

This project is built using **Vue 3**, **Vite**, **TypeScript**, and **Ant Design Vue**.

### Prerequisites

- **Node.js** 22.x or higher
- **pnpm** 9.0.0 or higher
- **Git**

### Setting Up Your Workspace

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BleckWolf25/FreeToolshed.git
   cd FreeToolshed
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the workspace.

### Development Commands

Use the following pnpm commands in your project root:

- **Start Vite development server:**

  ```bash
  pnpm run dev
  ```

- **Build production bundle:**

  ```bash
  pnpm run build
  ```

- **Run linter:**

  ```bash
  pnpm run lint
  ```

- **Run unit tests:**

  ```bash
  pnpm run test:unit
  ```

- **Run end-to-end tests:**

  ```bash
  pnpm run test:e2e
  ```

- **Run full validation suite:**

  ```bash
  pnpm run validate
  ```

---

## Style & Code Guidelines

### TypeScript and Vue Coding Style

To keep the codebase uniform and easy to read:

- **Indentation:** Use 2 spaces for indentation. Do not use tabs.
- **Naming Conventions:**
  - Classes and Interfaces: `PascalCase`
  - Functions and Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Vue Component Files: `PascalCase`
  - Utility/Logic/Composable Files: `camelCase` (e.g., `useJsonFormatter.ts`)
- **Braces:** Use standard Egyptian brackets style:

  ```typescript
  export function exampleFunction(): void {
    if (condition) {
      // code
    } else {
      // code
    }
  }
  ```

- **Type Safety:** Always use TypeScript types explicitly. Avoid `any` whenever possible.

### Commit Messages

Use prefix tags for commits, such as:

- `feat: ...` for a new feature or tool
- `fix: ...` for a bug fix
- `docs: ...` for documentation changes
- `refactor: ...` for code style or internal design changes
- `test: ...` for adding or updating tests
- `chore: ...` for configuration/build updates

Example:

```text
feat: add prime number checker and generator tool
```

---

## Testing

This project uses Vitest for unit testing, and Playwright for browser e2e testing.

### Writing Unit Tests

- Add composable unit tests in `src/composables/<category>/tests/` and component tests in `src/tools/<category>/tests/`.
- Name test files with the `.spec.ts` extension.

---

## Security Vulnerabilities

Please do not report security vulnerabilities in public issues. Refer to our [Security Policy](SECURITY.md) for instructions on how to report security issues privately.
