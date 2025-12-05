# Verify and Fix JSDoc Comments with ESLint

Use ESLint JSDoc plugin to ensure all functions, classes, and modules have proper, consistent documentation.

## CRITICAL: Persistence Requirement

**DO NOT STOP until ALL JSDoc issues are resolved.** This task requires complete coverage:
- Process every single file reported by the tools
- Fix every missing or malformed JSDoc comment
- Continue working through all modules systematically
- Re-run the analysis tools after each batch of fixes to confirm progress
- Only consider this task complete when ESLint reports zero JSDoc violations

If context window limits approach, document remaining files in the todo list and continue in the next session. Do not leave the codebase in a partially documented state.

## 1. Install JSDoc Plugin (if missing)

```bash
npm install -D eslint-plugin-jsdoc
```

## 2. Configure ESLint

Add to `.eslintrc.js`:
```javascript
{
  plugins: ['jsdoc'],
  extends: ['plugin:jsdoc/recommended-typescript'],
  rules: {
    'jsdoc/require-jsdoc': ['warn', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
        FunctionExpression: false
      }
    }],
    'jsdoc/require-description': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-returns-description': 'warn'
  }
}
```

## 3. Run JSDoc Analysis

```bash
npx eslint resources/js/ --ext .js,.ts,.vue --rule 'jsdoc/require-jsdoc: warn'
```

## 4. JSDoc Standards

Use consistent JSDoc format:

```typescript
/**
 * Short one-line summary ending with period.
 *
 * Longer description if needed. Explain the purpose,
 * not the implementation.
 *
 * @param param1 - Description of first parameter.
 * @param param2 - Description of second parameter.
 * @returns Description of return value.
 * @throws {Error} When param2 is negative.
 *
 * @example
 * ```ts
 * const result = functionName('value', 42);
 * ```
 */
function functionName(param1: string, param2: number): boolean {
  // ...
}
```

For classes:
```typescript
/**
 * Short one-line summary.
 *
 * Longer description of the class purpose and usage.
 */
class ClassName {
  /** Description of property. */
  propertyName: string;

  /**
   * Creates an instance of ClassName.
   * @param config - Configuration options.
   */
  constructor(config: Config) {
    // ...
  }
}
```

## 5. Processing Order

Work through files systematically:
1. Start with public API functions and classes
2. Then complex functions in components
3. Then store actions and getters
4. Then utility functions and helpers
5. Finally, internal/private functions

**Document everything.** Even simple functions benefit from a one-line description.

## 6. Fix Iteratively

For each file with issues:
1. Add missing JSDoc comments
2. Fix style violations reported by ESLint
3. Verify changes:
   ```bash
   npx eslint <file> --ext .ts,.vue
   ```
4. Commit when a file passes:
   ```bash
   git add <file>
   git commit -m "docs(<module>): add JSDoc to <file>"
   ```

## 7. Validate Coverage Improvement

After each batch of fixes:
```bash
npx eslint resources/js/ --ext .js,.ts,.vue
```

Continue fixing until zero JSDoc violations. Then run tests:
```bash
npm test
```

## Completion Criteria

This task is NOT complete until:
1. `npx eslint resources/js/ --ext .js,.ts,.vue` reports zero JSDoc violations
2. All public functions have JSDoc comments
3. All tests pass

**Do not stop early. Do not skip files. Process the entire codebase.**
