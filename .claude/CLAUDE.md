# User-Level Claude Code Preferences

## Session Behavior

- Always run `npm run test` after code changes to verify nothing broke
- Always run `npx tsc --noEmit` after TypeScript changes to check types
- Prefer editing existing files over creating new ones
- Follow existing code patterns exactly — don't introduce new conventions

## Commit Preferences

- Do not commit unless explicitly asked
- Use imperative mood in commit messages (e.g., "Add feature" not "Added feature")
- Keep commit messages concise (1-2 lines summary)

## Code Style

- Follow Prettier config: 4-space indent, single quotes, trailing commas, semicolons
- Follow naming conventions: `_` prefix for private, `opt_` prefix for optional params
- Use `any` sparingly — explicit `any` is allowed but should be intentional
- Prefer `Knot` over raw DOM manipulation, `Objekt` over plain objects within the framework

## What to Avoid

- Don't add new dependencies without asking
- Don't modify `jest.setup.ts` DOM structure without checking which tests depend on it
- Use `Promize`/`Deferred` for async operations — native `Promise` is used internally by `Promize` but not directly in application code
- Don't import from subdirectories in production code — always import from package root
