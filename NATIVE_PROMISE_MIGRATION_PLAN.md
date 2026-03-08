# Plan: Use Native Promise Inside Promize/Deferred

## Context

The SUI-JS framework uses custom `Promize` and `Deferred` classes instead of native `Promise`. The user wants to modernize the internals to use native `Promise` while preserving the existing external API — especially the multi-argument spreading behavior where `resolve([a, b])` becomes `callback(a, b)`.

The CLAUDE.md rule "Don't use native Promise/async/await in framework code — use Promize/Deferred" will need updating since the internals will now use native Promise.

## Approach: Native Promise as Internal Engine

Replace the manual status/data/callback tracking in `Promize` with a native `Promise` internally, while keeping the same public API (`resolve()`, `reject()`, `then()`, `defer()`).

## Files to Modify

1. **`src/core/promize.ts`** — Rewrite internals to use native Promise
2. **`src/core/deferred.ts`** — No changes needed (delegates to Promize)
3. **`src/core/async.ts`** — No changes needed (uses Promize/Deferred API)
4. **`.claude/CLAUDE.md`** — Update the rule about native Promise usage

## Implementation: `src/core/promize.ts`

Replace `Objekt`-based options storage with a native `Promise` + resolver/rejector pattern:

```typescript
export class Promize<T = object, K = object> {
    private _nativePromise: Promise<any[]>;
    private _resolve!: (value: any[]) => void;
    private _reject!: (value: any[]) => void;
    private _settled: boolean = false;
    private _status: boolean | null = null;
    private _data: any[] = [];

    constructor(opt_options: object | undefined = {}) {
        this._nativePromise = new Promise<any[]>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    resolve(opt_data?: T): void {
        if (this._settled) return;
        this._settled = true;
        this._status = true;
        const data: any[] = opt_data
            ? (isArray(opt_data) ? opt_data : [opt_data])
            : [];
        this._data = data;
        this._resolve(data);
    }

    reject(opt_data?: K): void {
        if (this._settled) return;
        this._settled = true;
        this._status = false;
        const data: any[] = opt_data
            ? (isArray(opt_data) ? opt_data : [opt_data])
            : [];
        this._data = data;
        this._reject(data);
    }

    then(
        resolve: (...args: T extends Array<any> ? T : [T]) => void,
        opt_reject?: (...args: K extends Array<any> ? K : [K]) => void,
        opt_complete?: (...args: T extends Array<any> ? T : [T]) => void,
    ): void {
        const reject = opt_reject || noop();
        const complete = opt_complete || noop();

        this._nativePromise.then(
            (data) => {
                resolve.apply(this, data);
                complete.apply(this, data);
            },
            (data) => {
                reject.apply(this, data);
                complete.apply(this, data);
            },
        );
    }

    defer(defer: Deferred, opt_complete?: () => void): void {
        this.then(
            (...args) => { defer.resolve(args); },
            (...args) => { defer.reject(args); },
            opt_complete,
        );
    }
}
```

Key design decisions:
- **Array spreading preserved**: Data is still wrapped in arrays and spread via `.apply()` in `then()` callbacks — all 19 consumer files work unchanged
- **Settle-once semantics**: Added `_settled` guard (native Promise already does this, but we need it for the stored data path)
- **`opt_options` parameter kept** in constructor signature for backward compatibility (ignored internally)
- **Remove `Objekt` import** — no longer needed since we don't store options in an Objekt
- **Native `.then()` handles timing**: Whether callbacks are registered before or after settlement, native Promise handles both cases correctly (microtask queue)

## Behavioral Change: Microtask Timing

The current implementation is **synchronous** — calling `resolve()` immediately invokes registered callbacks in the same call stack. Native Promise callbacks execute on the **microtask queue** (next tick).

This is the most significant change. Most consumers won't notice because they use the Deferred pattern (register callbacks, then resolve later). But any code that depends on synchronous callback execution after `resolve()` could break.

**Mitigation**: The `Async` class and all consumer code use `.then()` chains and `.defer()` which naturally handle async resolution. The test suite will catch any timing issues.

## Steps

1. Rewrite `Promize` internals as described above
2. Run `npx tsc --noEmit` to verify types
3. Run `npm run test` to verify all 1,687 tests pass
4. If timing issues surface in tests, investigate and fix case-by-case
5. Update `.claude/CLAUDE.md` rule to: "Use Promize/Deferred for async operations — native Promise is used internally but not directly in application code"

## Verification

1. `npx tsc --noEmit` — no type errors
2. `npm run test` — all tests pass
3. Manual check: `Async.serial()` and `Async.parallel()` still chain correctly
4. Verify `Xhr`/`Http` double-wrapped array spreading still works
