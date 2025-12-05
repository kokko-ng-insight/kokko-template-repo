# Refactor Using Complexity Analysis (ESLint Complexity Rules)

Use ESLint complexity rules to identify high-complexity functions and refactor them safely.

## 1. Run Complexity Analysis

```bash
# Check cyclomatic complexity with ESLint
npx eslint resources/js/ --ext .js,.ts,.vue --rule 'complexity: ["warn", 10]'

# For more detailed analysis, use es6-plato
npx es6-plato -r -d /tmp/plato-report resources/js/
open /tmp/plato-report/index.html
```

Alternative using complexity-report:
```bash
npx cr resources/js/**/*.ts --format plain
```

## 2. Identify Hotspots

Target functions with:
- Cyclomatic complexity > 10
- Many branches (if/else, switch)
- Deep nesting levels
- High cognitive complexity

## 3. Configure ESLint Rules

Add to `.eslintrc.js`:
```javascript
{
  rules: {
    'complexity': ['warn', { max: 10 }],
    'max-depth': ['warn', 4],
    'max-nested-callbacks': ['warn', 3],
    'max-lines-per-function': ['warn', { max: 50 }]
  }
}
```

## 4. Refactor Tactics (Apply One At A Time)

- Extract function for cohesive logic blocks
- Replace conditionals with early returns (guard clauses)
- Use object lookup maps instead of switch statements
- Replace nested callbacks with async/await
- Decompose large functions by responsibility
- Extract complex conditions into named functions
- Use strategy pattern for variant behavior
- Split components with multiple concerns

After each change:
```bash
npm test
npx eslint <target_file> --rule 'complexity: ["error", 10]'
```

Commit if passing:
```bash
git add <files>
git commit -m "refactor(complexity): reduce complexity in <function>"
```

## 5. Validate No Regression

When a file is improved:
```bash
npx eslint resources/js/ --ext .js,.ts,.vue
npm test
npm run build:check
```

## 6. Avoid Over-Refactoring

Stop when:
- Complexity <= 10
- Max nesting <= 3
- Function length reasonable
- Further splitting reduces readability

## 7. Final Quality Gate

```bash
npx eslint resources/js/ --ext .js,.ts,.vue
npm run build:check
npm test
```

Goal: No functions with cyclomatic complexity above 10.
