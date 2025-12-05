# Find and Fix TypeScript Errors

Use the TypeScript compiler to check for type errors in your codebase.

## 1. Run Type Check

```bash
npx tsc --noEmit
```

Or using the project's build script:
```bash
npm run build:check
```

## 2. Review Output

For each error, note:
- File path and line number
- Error code (e.g., TS2339, TS7006)
- Error description

## 3. Common Type Errors and Fixes

- **TS2339** (Property does not exist) -> Add to interface or use type assertion
- **TS7006** (Parameter has implicit any) -> Add explicit type annotation
- **TS2345** (Argument type mismatch) -> Fix the type or use type guard
- **TS2322** (Type not assignable) -> Ensure types are compatible
- **TS2531** (Object possibly null) -> Add null check or use optional chaining
- **TS2532** (Object possibly undefined) -> Add undefined check
- **TS18046** (Unknown type) -> Add type narrowing

## 4. Fix Iteratively

For each error:
1. Update code to fix the type issue
2. Re-run type check to verify:
   ```bash
   npx tsc --noEmit
   ```
3. Commit when a file is clean:
   ```bash
   git add <file>
   git commit -m "fix(types): resolve TS<code> in <file>"
   ```

## 5. Strict Mode Settings

For stricter checking, ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 6. Final Validation

```bash
npx tsc --noEmit
npm run build
npm test
```

Goal: Zero TypeScript errors with strict mode enabled.
