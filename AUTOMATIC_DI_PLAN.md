# Automatic DI for Controllers and Services

## Context

Currently, controllers and services must declare their dependencies as an explicit string array:

```typescript
app.controller('homeCtrl', ['http', 'template', 'dom'], HomeController);
app.service('authService', ['http', 'localDepot'], AuthService);
```

The goal is to make the injection array optional by auto-detecting dependencies via `static inject`:

```typescript
class AuthService {
    static inject = ['http', 'localDepot'] as const;
    constructor(private http: Http, private depot: Depot) { ... }
}
app.service('authService', AuthService);
```

## Design Decisions

1. **Two-tier resolution** — priority: explicit `moduleInjections` array > `static inject` property on class
2. **Backward compatible** — existing `app.service('name', ['dep1'], Cls)` calls continue to work unchanged
3. **`static inject`** as the automatic DI mechanism — minification-safe, no decorators, no extra dependencies

## Files to Modify

| File | Change |
|------|--------|
| `src/utils/types.ts` | Extend `ClassRef` with optional `static inject` |
| `src/core/module.ts` | Update `add()` signature, add auto-detection in `_resolveDependencies()` |
| `src/component/application.ts` | Update `controller()` and `service()` signatures |
| `src/core/module.spec.ts` | Add tests for both resolution tiers |

## Implementation

### Step 1: Update `Module.add()` signature

**`src/core/module.ts`** — Make `moduleInjections` optional:

```typescript
// Before:
add(name: string, moduleInjections: string[], moduleCallback: ClassRef): string

// After:
add(name: string, moduleInjections: string[] | ClassRef, opt_moduleCallback?: ClassRef): string {
    // Overload: add('name', MyClass) — no injection array
    if (typeof moduleInjections === 'function') {
        this._modules[name] = {
            moduleInjections: [],
            moduleCallback: moduleInjections as ClassRef,
        };
    } else {
        this._modules[name] = {
            moduleInjections,
            moduleCallback: opt_moduleCallback!,
        };
    }
    return name;
}
```

### Step 2: Update `_resolveDependencies()` with auto-detection

**`src/core/module.ts`** — Add resolution priority chain:

```typescript
private _getInjections(dependency: Dependency): string[] {
    // Priority 1: Explicit injection array (from add() call)
    if (dependency.moduleInjections.length > 0) {
        return dependency.moduleInjections;
    }
    // Priority 2: Static inject property on class
    if (dependency.moduleCallback.inject) {
        return [...dependency.moduleCallback.inject];
    }
    return [];
}

private _resolveDependencies(dependency: Dependency): object {
    const injections = this._getInjections(dependency);
    const moduleArgs: any[] = [];
    each(injections, (injection: string) => {
        moduleArgs.push(
            (this._instances as Record<string, any>)[injection] || injection,
        );
    });
    return new dependency.moduleCallback(...moduleArgs);
}
```

### Step 3: Update `ClassRef` type to support `static inject`

**`src/utils/types.ts`** — Extend `ClassRef` to allow optional static property:

```typescript
export type ClassRef = {
    new (...args: any[]): any;
    inject?: readonly string[];
};
```

### Step 4: Update Application registration methods

**`src/component/application.ts`** — Update both `controller()` and `service()`:

```typescript
// Before:
controller(name: string, moduleInjections: string[], moduleCallback: ClassRef): string
service(name: string, moduleInjections: string[], moduleCallback: ClassRef): string

// After (overloaded):
controller(name: string, moduleInjections: string[] | ClassRef, opt_moduleCallback?: ClassRef): string {
    return this._module.add(name, moduleInjections, opt_moduleCallback);
}

service(name: string, moduleInjections: string[] | ClassRef, opt_moduleCallback?: ClassRef): string {
    return this._module.add(name, moduleInjections, opt_moduleCallback);
}
```

### Step 5: Update topological sort for auto-detected deps

**`src/core/module.ts`** `_getSortedServices()` — Currently reads `mod.moduleInjections` to build the dependency graph. Update to use `_getInjections()` so auto-detected dependencies are also sorted correctly:

```typescript
private _getSortedServices(services: string[]): string[] {
    const edges = services
        .map((service) => {
            const mod = this._modules[service];
            if (!mod) return [];
            const moduleInjections = this._getInjections(mod).filter(
                (moduleInjection) => services.includes(moduleInjection),
            );
            if (moduleInjections.length === 0) {
                moduleInjections.push(null as unknown as string);
            }
            return moduleInjections.map((injection) => [injection, service]);
        })
        .flat();
    return this._topologicalSort(edges).slice(1);
}
```

### Step 6: Add tests

**`src/core/module.spec.ts`** — Test auto-DI resolution:
- Explicit array still works (backward compat)
- `static inject` resolution
- Priority: explicit array > static inject
- `add('name', MyClass)` shorthand (no injection array)
- Topological sort works with `static inject` deps

## Usage Examples After Implementation

```typescript
// 1. Static inject (automatic, minification-safe)
class AuthService {
    static inject = ['http', 'localDepot'] as const;
    constructor(private http: Http, private depot: Depot) { ... }
    enter() { ... }
}
app.service('authService', AuthService);

// 2. Explicit array (backward compatible, always works)
app.service('authService', ['http', 'localDepot'], AuthService);
```

## Verification

1. `npx tsc --noEmit` — no type errors
2. `npm run test` — all existing + new tests pass
3. `npm run build` — full build succeeds
4. Verify existing `app.controller()`/`app.service()` calls with explicit arrays still work
