# Modernize HTTP Module: Replace XMLHttpRequest with Fetch API

## Context

The `Xhr` class (src/module/xhr.ts) wraps `XMLHttpRequest` directly. The `Http` class (src/module/http.ts) wraps `Xhr` and strips the raw XHR object from responses. This migration replaces XMLHttpRequest with the native `fetch` API internally while preserving the public Promize-based API. Node 24+ is required (per package.json), so `fetch` and `Response` are natively available — no polyfills needed.

**Key improvements:**
- Replace legacy XMLHttpRequest with modern fetch API
- Accept 2xx status range (not just 200) — current behavior is a bug
- Eliminate Blob/FileReader workaround (fetch handles JSON natively)
- Replace leaky `XMLHttpRequest` in return types with a clean `HttpResponse` interface
- Simpler response handling (no readyState machine)

## Design Decisions

1. **Replace in-place** — rewrite `Xhr` internals, don't create a parallel class
2. **New `HttpResponse` type** replaces `XMLHttpRequest` in Xhr's return tuple and `eventAfterRequest` signature: `{ status, statusText, url, headers }`
3. **Accept 2xx range** via `response.ok` (200-299 resolve, others reject)
4. **Keep `X-Requested-With: XMLHttpRequest` header** for backend compatibility
5. **`credentials: 'include'`** when auth is set (maps from `withCredentials = true`)
6. **Private `async/await`** is acceptable inside Xhr for fetch handling — public API stays Promize-based
7. **Independent from Promize migration** — the existing NATIVE_PROMISE_MIGRATION_PLAN.md is a separate effort

## Files to Modify

| File | Change |
|------|--------|
| `src/module/xhr.ts` | Core rewrite: replace XMLHttpRequest with fetch |
| `src/module/http.ts` | Update types: `XMLHttpRequest` → `HttpResponse`, export `HttpResponse` |
| `src/component/application.ts` | Update `eventAfterRequest` override (uses `...params` spread, minimal change) |
| `src/test-helpers.ts` | Replace `MockXMLHttpRequest` with fetch mock utilities |
| `src/module/xhr.spec.ts` | Rewrite 116 tests to use fetch mock |
| `src/module/http.spec.ts` | Update 96 tests for new types and fetch mock |
| `src/module/index.ts` | Export `HttpResponse` type |
| `.claude/CLAUDE.md` | Note that private `async/await` is permitted when wrapping fetch |

## Implementation

### Step 1: Add HttpResponse type and fetch mock infrastructure

**`src/module/http.ts`** — Add and export:
```typescript
export type HttpResponse = {
    status: number;
    statusText: string;
    url: string;
    headers: Record<string, string>;
};
```

**`src/test-helpers.ts`** — Add fetch mock utilities alongside existing XHR mock:
- `installFetchMock()` — replaces `globalThis.fetch` with a jest.fn that captures requests
- `respondFetch(status, headers, body)` — resolves the captured fetch Promise
- `getLastFetchRequest()` — returns `{ url, init }` of last call
- `uninstallFetchMock()` — restores original fetch

### Step 2: Rewrite Xhr internals

**`src/module/xhr.ts`** — Key changes:

1. **Remove** `httpRequest: XMLHttpRequest` property, `_onReadyStateChange()`, `_setResponseType()`
2. **Add** `private _httpResponse: HttpResponse` property
3. **Simplify `XhrType`** — remove `XMLHttpRequestResponseType` element (fetch determines format by which `.json()`/`.text()` method is called)
4. **Rewrite `_init()`** — remove `new XMLHttpRequest()` and readystate handler
5. **Rewrite `_createRequest()`**:
   - Build headers from `this.requestHeaders` map
   - Construct `RequestInit` with method, headers, credentials, body
   - Call `fetch(url, init)` and pipe result through `_handleFetchResponse()`
   - Resolve/reject deferred based on `response.ok`
   - No body for GET/HEAD (fetch spec forbids it)
6. **New `_handleFetchResponse(response)`**:
   - Build `HttpResponse` from `Response` object
   - Parse JSON via `response.json()` or text via `response.text()` based on Content-Type
   - Extract filename from response headers
   - Return `[Objekt, string]`
7. **Update `_setRequestHeaders()`** — only populate `this.requestHeaders` map, remove `httpRequest.setRequestHeader()` calls and `responseType` special-case
8. **Update `_getFilenameFromHeader()`** — accept `Headers` and `url` params instead of reading from `this.httpRequest`
9. **Update Deferred generic** — `[XMLHttpRequest, Objekt, string]` → `[HttpResponse, Objekt, string]`

### Step 3: Update Http and Application

**`src/module/http.ts`**:
- Update `_getPromise()` parameter type: `Promize<[HttpResponse, Objekt, string], ...>`
- Update `eventAfterRequest()` first param: `XMLHttpRequest` → `HttpResponse`
- Remove `XMLHttpRequest` references from JSDoc

**`src/component/application.ts`** (line 491):
- Already uses `...params` spread — no functional change needed, just type alignment

**`src/module/index.ts`**:
- Export `HttpResponse` type

### Step 4: Rewrite tests

**`src/module/xhr.spec.ts`**:
- Replace `installXhrMock()`/`getLastXhr()`/`mock.respond()` → `installFetchMock()`/`getLastFetchRequest()`/`respondFetch()`
- Assertions on `mock.method` → `getLastFetchRequest().init.method`
- Assertions on `mock.requestHeaders` → `getLastFetchRequest().init.headers`
- Remove `responseType` assertions (not a fetch concept)
- Replace `withCredentials` assertions → check `init.credentials`
- Remove readyState lifecycle tests
- Add 2xx range tests (201 Created resolves, 204 No Content resolves, 301/400/500 reject)
- Add network error test (fetch rejects)
- Tests need `async`/`await` or `done()` pattern since fetch is inherently async

**`src/module/http.spec.ts`**:
- Same mock replacement
- Update `eventAfterRequest` spy assertions for `HttpResponse` type
- Add 2xx range tests at Http level

### Step 5: Cleanup

- Remove `MockXMLHttpRequest`, `installXhrMock`, `uninstallXhrMock`, `getLastXhr` from `src/test-helpers.ts`
- Remove unused XHR-related imports from `xhr.ts`
- Update `.claude/CLAUDE.md` rule about async/await

## Future Enhancements (Not in Scope)

These are enabled by the fetch migration but should be separate PRs:
- **AbortController** — add `abort()` method using `AbortController`
- **Timeout** — pass `AbortSignal.timeout(ms)` to fetch
- **FormData / file upload** — detect `FormData` body, skip serialization
- **Streaming** — use `response.body` ReadableStream for large downloads

## Verification

1. `npx tsc --noEmit` — no type errors
2. `npm run test` — all tests pass
3. `npm run build` — full build succeeds
4. Manual: test with `npm run dev` and verify HTTP requests work in example app
