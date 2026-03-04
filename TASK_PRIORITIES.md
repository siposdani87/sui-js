# Task Priorities & Dependencies

## Overview

Combined prioritization of **Improvement Plan** and **MDL Migration Plan** tasks, ordered by execution priority with dependencies.

## Current Status

- **Improvement Plan:** Phase 7/Testing phases 0–22 complete, only phase 23 (jest-axe a11y) remains
- **MDL Migration Plan:** 9 phases (0–8), none started

## Execution Order

| Priority | Task | Plan | Depends On | Rationale |
|----------|------|------|------------|-----------|
| ~~1~~ | ~~Phase 1: Stricter TypeScript~~ | ~~Improvement~~ | ~~—~~ | ~~DONE — noUnusedLocals, noUnusedParameters, noUncheckedIndexedAccess enabled~~ |
| ~~2~~ | ~~Phase 2: ESLint Rule Tightening~~ | ~~Improvement~~ | ~~Imp. Phase 1~~ | ~~DONE — no-prototype-builtins, no-case-declarations, consistent-type-imports enabled~~ |
| ~~3~~ | ~~Phase 3: Code Cleanup~~ | ~~Improvement~~ | ~~Imp. Phase 2~~ | ~~DONE — 5 TODO/FIXME removed, TreeView stub deleted, .prettierignore added~~ |
| ~~4~~ | ~~Phase 5: Build & Bundle~~ | ~~Improvement~~ | ~~—~~ | ~~DONE — esbuild:analyze, esbuild:size-check scripts, 250KB limit in build~~ |
| ~~5~~ | ~~Phase 6: CI/CD~~ | ~~Improvement~~ | ~~Imp. Phase 5~~ | ~~DONE — lint + build + size-check steps added to CI~~ |
| 6 | Phase 0: MDL Infrastructure | MDL | Imp. Phases 1–3 | Start migration after code quality improvements |
| 7 | Phase 1: MDL Buttons | MDL | MDL Phase 0 | Low risk, good first migration |
| 8 | Phase 2: MDL Text Fields | MDL | MDL Phase 1 | Low-medium risk |
| 9 | Phase 3: MDL Checkbox/Radio/Switch | MDL | MDL Phase 2 | Low risk, pure CSS replacement |
| 10 | Phase 4: MDL Tooltip | MDL | MDL Phase 3 | Medium risk |
| 11 | Phase 5: MDL Dropdown/Menu | MDL | MDL Phase 4 | Medium risk |
| 12 | Phase 6: MDL Progress Bar & Spinner | MDL | MDL Phase 5 | Highest coupling, benefits from prior phases |
| 13 | Phase 7: MDL Range Slider | MDL | MDL Phase 6 | Medium risk |
| 14 | Phase 4: Replace crypto-js | Improvement | — | Independent, can run in parallel with MDL phases |
| 15 | Phase 8: MDL Cleanup & Finalization | MDL | MDL Phases 1–7 | Must be last MDL phase |
| 16 | Phase 23: jest-axe a11y tests | Testing | MDL Phase 8 | Run after MDL migration since HTML/CSS structure will change |

## Key Insights

- **Improvement Phases 1–3, 5–6 before MDL migration** — stricter TS, ESLint rules, and CI/CD provide a safety net for the large-scale refactor
- **crypto-js replacement is fully independent** — can be done anytime, even in parallel with MDL phases
- **a11y testing (Phase 23) after MDL migration** — testing accessibility on the old MDL markup would produce findings that become irrelevant after migration
- **MDL phases are strictly sequential** (each builds on the previous)
