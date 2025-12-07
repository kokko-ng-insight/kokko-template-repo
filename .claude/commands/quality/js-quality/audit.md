# Security Hardening Using ESLint Security Plugins

Use ESLint security plugins and npm audit to detect common JavaScript/TypeScript security issues.

## 1. Run Security Scans

```bash
# Check for vulnerable dependencies
npm audit

# Run ESLint with security rules (if configured)
npx eslint --ext .js,.ts,.vue resources/js/ --rule 'no-eval: error'
```

For comprehensive security scanning:
```bash
npm audit --audit-level=moderate
```

## 2. Install Security Plugins (if missing)

```bash
npm install -D eslint-plugin-security @typescript-eslint/eslint-plugin
```

Add to `.eslintrc.js`:
```javascript
{
  plugins: ['security'],
  extends: ['plugin:security/recommended-legacy']
}
```

## 3. Common Security Issues

- **detect-object-injection** - Bracket notation with user input
- **detect-non-literal-fs-filename** - Dynamic file paths
- **detect-non-literal-regexp** - User input in regex
- **detect-eval-with-expression** - eval() with variables
- **detect-no-csrf-before-method-override** - CSRF vulnerabilities
- **detect-possible-timing-attacks** - String comparison timing attacks

## 4. Fix Patterns

Common issues and actions:
- `eval()` / `new Function()` -> Use safe alternatives, JSON.parse for data
- `innerHTML` / `dangerouslySetInnerHTML` -> Use textContent or sanitize
- Dynamic `require()` -> Use static imports
- Unvalidated redirects -> Whitelist allowed URLs
- SQL/NoSQL injection -> Use parameterized queries
- Prototype pollution -> Freeze objects, use Object.create(null)

## 5. Fix Incrementally

For each finding:
```bash
npm test
npx eslint <affected_files>
```

Commit if clean:
```bash
git add <files>
git commit -m "security(eslint): mitigate <issue> in <file>"
```

## 6. Suppressing False Positives

Use eslint-disable comments sparingly:
```javascript
// eslint-disable-next-line security/detect-object-injection -- key is validated enum
const value = obj[validatedKey];
```

## 7. Final Quality Gate

```bash
npm audit --audit-level=high
npx eslint resources/js/ --ext .js,.ts,.vue
npm test
```

Goal: Zero high-severity vulnerabilities and security lint violations.
