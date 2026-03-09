# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-09

### Added

- Test suite expanded from 1,187 to 2,212 tests (97% statement coverage, 88% branch coverage)
- jest-axe automated accessibility tests with ARIA attributes for UI components
- destroy() methods for State, Screen, Page, and Form with proper listener cleanup
- Automatic DI via `static inject` for controllers and services
- Scheduler runner with 30s interval and `stop()` method
- Example page demos for Http/Xhr, GeoLocation, Scheduler, and ContentHandler
- `@example` JSDoc tags to Xhr HTTP methods
- Contributing guide, security policy, and migration docs
- Architecture decisions and modernization journey blog posts
- Conventional commits enforcement (commitlint + husky) and changelog automation
- HTML bundle visualization report and SRI hash generation
- TypeScript incremental builds and CI cache
- Bundle size CI reporting and npm audit in CI

### Changed

- Split `googleMap.ts` into focused modules (`mapMarkerOps.ts`, `mapPolygonOps.ts`, `mapLabel.ts`)
- Split `operation.ts` into 7 focused utility modules
- Replace XMLHttpRequest with fetch API in Xhr module
- Replace Promize internals with native Promise
- Replace crypto-js with native implementations to reduce bundle size
- Replace `javascript:void(0)` with semantic buttons
- Consolidate dark mode via CSS custom properties (eliminate 42 Dark.scss files)
- Modernize design tokens and component styles (indigo/orange palette, system fonts)
- Normalize z-index scale and replace hardcoded values
- Add `will-change` hints to animated elements for GPU compositing
- Enable strict type-checked ESLint rules and fix violations
- Enable strict null checks and `noImplicitAny` in test config
- Enable `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`
- Reduce explicit `any` usage in source files
- Type `Collection.Type` as `CollectionType<T>` instead of `any`
- Add typed `Objekt` generics to module option fields
- Replace deprecated APIs and modernize `indexOf` to `includes`/`startsWith`
- Remove MDL dependency from example page and Roboto font
- Remove generated coverage, reports, and TypeDoc API docs from git tracking
- Upgrade ESLint 9 → 10, Stylelint 16 → 17, globals 16 → 17
- Bump Node.js engine requirement to >=24.0.0

### Fixed

- Color contrast for WCAG AA compliance
- `is-disabled` state handling, expandable textfield, and color input states
- Merge bug, replace constructor switch with typeof/instanceof
- Calendar bug
- `no-useless-assignment` lint error in table.ts for ESLint 10 compatibility

## [1.2.0] - 2026-03-04

### Added

- 128 new tests across phases 14-17 (1187 → 1315 tests, 77% statement coverage)
- destroy() methods for State, Screen, Page, and Form with proper listener cleanup
- Comprehensive tests for 6 menu modules (header, footer, topMenu, navBar, leftMenu, bottomMenu)

### Changed

- Upgrade ESLint 9 → 10 with migration (remove --ext flag, add @eslint/js)
- Upgrade Stylelint 16 → 17, stylelint-config-standard 39 → 40, stylelint-scss 6 → 7
- Upgrade globals 16 → 17, eslint-plugin-tsdoc 0.5.0 → 0.5.2
- Bump Node.js engine requirement to >=20.19.0

### Fixed

- no-useless-assignment lint error in table.ts for ESLint 10 compatibility

## [1.1.0] - 2026-02-18

### Added

- Comprehensive JSDoc documentation to all source files
- Docusaurus site with guides, API reference, and Algolia search
- Test suite expanded from 180 to 1187 tests (75% statement coverage)

### Changed

- Enable TypeScript strict mode across entire codebase
- Upgrade Docusaurus to 3.9.2 and TypeDoc to 0.28.17
- Upgrade dev dependencies (typescript-eslint 8.56, prettier 3.8.1, sass 1.97.3)

### Fixed

- Deprecated ESLint ban-types rule replaced with no-unsafe-function-type

## [1.0.0] - 2024-04-20

### Changed

- Upgrade packages

### Fixed

- Parse method of DateIO

## [0.9.17] - 2024-03-22

### Added

- setParent method on Knot
- Prototype of viewTransition
- JetBrains support to homepage

### Changed

- Upgrade packages

## [0.9.16] - 2023-10-15

### Added

- Improved Promize and Deferred typings

### Changed

- Improve HTTP request types

### Removed

- pluck method from Collection

### Fixed

- Callback type of link helper methods
- Function types

## [0.9.15] - 2023-08-12

### Added

- Color mode to documentation website

### Changed

- Improve typings
- Upgrade Jest
- Improve debug logging

## [0.9.14] - 2023-06-25

### Fixed

- listStyle of textarea

## [0.9.13] - 2023-05-19

### Fixed

- Hover style of leftMenu

## [0.9.12] - 2023-05-19

### Fixed

- Style of leftMenu

## [0.9.11] - 2023-05-17

### Changed

- Improve styles of dark theme

## [0.9.10] - 2023-03-09

### Changed

- Upgrade packages

### Removed

- Unused styles

## [0.9.9] - 2023-03-04

### Changed

- Improve style structure

## [0.9.8] - 2023-03-02

### Changed

- Improve change event on dateTimeField

## [0.9.7] - 2023-02-01

### Changed

- Rename pureCopy to copyObject
- Upgrade Docusaurus

### Fixed

- Async results issue

## [0.9.6] - 2023-01-29

### Added

- pureCopy method

## [0.9.5] - 2023-01-27

### Fixed

- isPureObject method

## [0.9.4] - 2023-01-23

### Changed

- Upgrade packages

### Fixed

- Style of tabPanel

## [0.9.3] - 2023-01-16

### Added

- InstanceKey type

### Changed

- Upgrade packages

### Fixed

- stringify method on router

## [0.9.2] - 2022-12-19

### Added

- Dark style for progress
- isPureObject method

### Fixed

- Background color of tabPanel

## [0.9.1] - 2022-11-28

### Changed

- Improve style of switchField

### Fixed

- Style of page header

## [0.9.0] - 2022-11-10

### Fixed

- Style of dialog and confirm

## [0.8.0] - 2022-09-05

### Added

- Algolia search to Docusaurus website

### Changed

- Upgrade esbuild and sass packages

## [0.7.0] - 2022-08-13

### Added

- Jest tests
- Docusaurus documentation website

## [0.5.0] - 2021-11-10

### Changed

- Refactor JavaScript codebase to TypeScript
- Use esbuild as main compiler

## [0.4.0] - 2019-09-06

### Changed

- Upgrade Google Closure Compiler and Library

## [0.1.0] - 2014-06-05

### Added

- Initial release
