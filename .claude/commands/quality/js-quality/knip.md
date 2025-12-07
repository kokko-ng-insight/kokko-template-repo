# Find and Remove Dead Code with Knip

Use Knip to analyze the codebase for unused exports, dependencies, and dead code.

## 1. Install Knip (if missing)

```bash
npm install -D knip
```

## 2. Run Dead Code Analysis

```bash
npx knip
```

For more verbose output:
```bash
npx knip --include files,exports,types,duplicates
```

## 3. What Knip Detects

- **Unused files** - Files not imported anywhere
- **Unused exports** - Exported functions/classes/variables not imported
- **Unused dependencies** - Packages in package.json not used in code
- **Unused devDependencies** - Dev packages not referenced
- **Unlisted dependencies** - Used but not in package.json
- **Duplicate exports** - Same thing exported multiple times

## 4. Verify Each Finding

For each item detected:

1. **Cross-check references** across the codebase:
   - Dynamic imports: `import()`, `require()`
   - String-based access: `components[name]`
   - Vue template references
   - Config file references
   - Test file usage

2. **Check for indirect usage**:
   - Entry points in build config
   - Plugin registrations
   - Global component registration
   - Runtime computed property access

## 5. Remove Verified Dead Code

**If certain the code is unused:**

```bash
# Remove unused dependency
npm uninstall <package-name>

# Or remove unused file/export manually
```

## 6. Test After Each Removal

```bash
npm run build:check
npm test
```

## 7. Commit Incrementally

```bash
git add .
git commit -m "chore(cleanup): remove unused <item> as detected by knip"
```

## 8. Configure Knip

Create `knip.json` to customize:
```json
{
  "entry": ["resources/js/app.ts"],
  "project": ["resources/js/**/*.{ts,vue}"],
  "ignore": ["**/*.d.ts", "**/test/**"],
  "ignoreDependencies": ["@types/*"]
}
```

## 9. Final Validation

```bash
npx knip
npm run build
npm test
```

Goal: Zero unused exports, files, or dependencies reported by Knip.
