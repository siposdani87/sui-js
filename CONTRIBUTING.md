# Contributing to SUI-JS

Thank you for your interest in contributing to SUI-JS!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/sui-js.git`
3. Install dependencies: `npm ci`
4. Create a feature branch: `git checkout -b feature/my-feature`

## Development

```bash
npm run dev          # Dev server with watch mode on :4000
npm run test:watch   # Run tests in watch mode
npm run lint         # Check TypeScript, ESLint, Stylelint
npm run format       # Format code with Prettier
```

## Code Style

- **TypeScript**: Strict mode, 4-space indent, single quotes, trailing commas
- **SCSS**: Follow existing SUI component patterns
- **Naming**: `_` prefix for private members, `opt_` prefix for optional parameters
- **Testing**: Add tests for new functionality; colocate as `*.spec.ts`

## Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Ensure no type errors: `npx tsc --noEmit`
3. Ensure code is formatted: `npm run format`
4. Keep PRs focused — one feature or fix per PR
5. Write a clear description of what changed and why

## Reporting Issues

- **Bugs**: Use the [bug report template](https://github.com/siposdani87/sui-js/issues/new?template=bug_report.md)
- **Features**: Use the [feature request template](https://github.com/siposdani87/sui-js/issues/new?template=feature_request.md)
- **Security**: See [SECURITY.md](./SECURITY.md)
