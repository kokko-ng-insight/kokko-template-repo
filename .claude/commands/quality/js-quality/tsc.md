# Find and Fix TypeScript Errors

Use the TypeScript compiler to enforce strict type checking across the codebase.

## 1. Run Type Check

Standard check:
```bash
npx tsc --noEmit
```

Using the project's build script:
```bash
npm run build:check
```

For Vue SFC files (recommended):
```bash
npx vue-tsc --noEmit
```

## 2. Review Output

For each error, note:
- File path and line number
- Error code (e.g., TS2339, TS7006)
- Error description

For CI-parseable output:
```bash
npx tsc --noEmit --pretty false
```

## 3. Common Type Errors and Fixes

- **TS2339** (Property does not exist) -> Add to interface or use type assertion
- **TS7006** (Parameter has implicit any) -> Add explicit type annotation
- **TS2345** (Argument type mismatch) -> Fix the type or use type guard
- **TS2322** (Type not assignable) -> Ensure types are compatible
- **TS2531** (Object possibly null) -> Add null check or use optional chaining
- **TS2532** (Object possibly undefined) -> Add undefined check
- **TS18046** (Unknown type) -> Add type narrowing
- **TS7053** (Element implicitly has any) -> Use proper index signature or Map

## 4. Fix Iteratively

For each error:
1. Update code to fix the type issue
2. Re-run type check to verify:
   ```bash
   npx vue-tsc --noEmit
   ```
3. Commit when a file is clean:
   ```bash
   git add <file>
   git commit -m "fix(types): resolve TS<code> in <file>"
   ```

## 5. Strict Mode Settings

For maximum strictness, ensure `tsconfig.app.json` includes:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 6. Eliminating `any` Types

**CRITICAL**: The `any` type defeats the purpose of type checking and must be avoided unless absolutely necessary.

### Never acceptable reasons to use `any`:
- "It's faster to implement"
- "The types are too complex"
- "Context window constraints" (work continues through auto-compaction)
- "I'll fix it later"
- "The library types are wrong" (submit a PR or use module augmentation)

### Acceptable (rare) exceptions:
- Interfacing with truly untyped third-party code (prefer `@types/*` packages or declaration files)
- Migrating legacy JavaScript where types are genuinely unknowable (must have a removal plan)

### Find explicit `any` types that must be replaced:
```bash
grep -rn ": any" resources/js/ --include="*.ts" --include="*.vue"
grep -rn "as any" resources/js/ --include="*.ts" --include="*.vue"
grep -rn "<any>" resources/js/ --include="*.ts" --include="*.vue"
```

### Preferred alternatives to `any`:
- `unknown` - forces type narrowing before use (safest choice)
- Generics (`<T>`) - for polymorphic/reusable code
- Union types (`A | B | C`) - when type is one of several known types
- `Record<string, ValueType>` - for object dictionaries
- Specific interfaces - define the actual shape
- `never` - for exhaustiveness checking in switch/if chains
- Type guards (`is`, `asserts`) - to narrow unknown/union types safely

### Type assertion rules:
- **Never**: `value as any` - always find the real type
- **Avoid**: `value as SomeType` without validation
- **Prefer**: Type guards that validate at runtime:
  ```typescript
  function isUser(value: unknown): value is User {
    return typeof value === 'object' && value !== null && 'id' in value;
  }
  ```

## 7. Gradual Adoption Strategy

If strict mode produces too many errors initially:

1. Start with per-directory checking:
   ```bash
   npx tsc --noEmit --project tsconfig.app.json resources/js/Components/
   ```

2. Track progress by counting errors:
   ```bash
   npx vue-tsc --noEmit 2>&1 | grep -c "error TS"
   ```

3. Add `// @ts-expect-error` sparingly with justification (prefer over `@ts-ignore`)

## 8. Final Validation

```bash
npx vue-tsc --noEmit
npm run build
npm run test
```

Goal: Zero TypeScript errors with all strict options enabled.
