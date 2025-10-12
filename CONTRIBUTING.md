# Contributing to GitGaze

Thank you for your interest in contributing to GitGaze! We welcome contributions from the community and are pleased to have you join us.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/gitgaze.git
   cd gitgaze
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## How to Contribute

### Types of Contributions

We welcome several types of contributions:
- **Bug fixes**: Help us identify and fix issues
- **Feature enhancements**: Propose and implement new features
- **Documentation**: Improve our docs, README, or code comments
- **Testing**: Add or improve test coverage
- **Performance**: Optimize existing code
- **UI/UX improvements**: Enhance the user interface and experience

### Before You Start

1. **Check existing issues**: Look through existing issues to see if your contribution is already being discussed
2. **Create an issue**: For significant changes, create an issue first to discuss your approach
3. **Assign yourself**: Comment on the issue to let others know you're working on it

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow our coding standards
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your descriptive commit message"
   ```
   
   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch and provide a clear description
   - Link any related issues using "Closes #issue-number"

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested your changes
- **Breaking changes**: Clearly document any breaking changes

## Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:
- **Clear title**: Summarize the issue in the title
- **Description**: Detailed description of the problem
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Requesting Features

For feature requests, please include:
- **Clear title**: Summarize the feature
- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: Any alternative solutions considered
- **Additional context**: Screenshots, mockups, or examples

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add type annotations where helpful
- Prefer `const` over `let`, avoid `var`

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Use Next.js App Router conventions
- Implement proper error boundaries
- Optimize for performance (use `useMemo`, `useCallback` when needed)

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic HTML elements

### File Organization

```
app/
├── _components/     # Reusable components
├── _services/       # API and external service calls
├── _interface/      # TypeScript interfaces and types
├── _assets/         # Static assets
└── ...              # Pages and layouts
```

## Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting PR
- Test across different browsers and devices
- Include edge cases in your testing

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for complex functions
- Update this CONTRIBUTING.md if you change the contribution process
- Include inline comments for complex logic

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Reach out to the maintainers
- Check existing discussions

## Recognition

Contributors will be recognized in our README.md file. Thank you for helping make GitGaze better!

---

**Happy Contributing!** 🎉
