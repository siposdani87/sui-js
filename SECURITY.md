# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.2.x   | Yes       |
| < 1.2   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email [siposdani87@gmail.com](mailto:siposdani87@gmail.com) with details
3. Include steps to reproduce, impact assessment, and suggested fix if possible

You can expect an initial response within 48 hours. Critical vulnerabilities will be patched and released as soon as possible.

## Security Practices

- Dependencies are audited via `npm audit` in CI
- The codebase uses TypeScript strict mode
- Cookie operations default to `SameSite=Lax`
- All DOM operations go through the `Knot` wrapper
