# Generate Tests

Generate comprehensive tests for the JavaScript/TypeScript codebase, including unit tests (Vitest) and end-to-end browser tests (Playwright).

## Step 1: Analyze Existing Test Coverage

1. Check if tests exist:
   ```bash
   npm test -- --coverage 2>/dev/null || echo "No tests found or coverage not configured"
   ```

2. If using Vitest with coverage:
   ```bash
   npx vitest run --coverage
   ```

3. Identify untested or under-tested modules by reviewing the coverage report.

## Step 2: Generate Unit Tests (Vitest)

For each module or function lacking coverage:

1. **Analyze the code** - understand inputs, outputs, side effects, and edge cases
2. **Create test file** - follow the naming convention `<module>.test.ts` or `__tests__/<module>.test.ts`
3. **Write tests covering**:
   - Happy path scenarios
   - Edge cases (empty inputs, boundary values, null/undefined handling)
   - Error conditions and exception handling
   - Mocked external dependencies (APIs, stores)

4. **Use test utilities** for common setup in test helpers

Example test structure:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { functionUnderTest } from './module';

describe('functionUnderTest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return expected result for valid input', () => {
    const result = functionUnderTest('valid');
    expect(result).toBe('expected');
  });

  it('should throw error for invalid input', () => {
    expect(() => functionUnderTest(null)).toThrow();
  });
});
```

5. **Run and verify**:
   ```bash
   npx vitest run <test-file>
   ```

## Step 3: Generate E2E Browser Tests (Playwright)

If the project has web routes/UI components:

1. **Create E2E test directory**: `tests/e2e/`

2. **Write E2E tests** in `tests/e2e/<feature>.spec.ts`:
   - Test critical user flows (navigation, form submissions)
   - Test UI state changes and interactions
   - Test API responses via the browser
   - Use `page.goto()`, `page.click()`, `page.fill()`, `expect()` assertions

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test('should complete user flow', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="button"]');
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

3. **Run Playwright tests**:
   ```bash
   npx playwright test --headed  # visible browser
   npx playwright test           # headless
   ```

## Step 4: Increase Coverage (if tests already exist)

1. Review the coverage report from Step 1
2. Focus on:
   - Lines marked as uncovered
   - Branches not taken
   - Functions with 0% coverage
3. Add targeted tests for these gaps
4. Re-run coverage until target is met (aim for 80%+ coverage)

## Step 5: Validate All Tests Pass

```bash
npm test
npx vitest run --coverage
npx playwright test
```

## Guidelines

- **Mock external dependencies** - API calls, stores, browser APIs
- **Keep tests fast** - avoid unnecessary waits
- **Use data-testid attributes** for reliable selectors
- **One assertion focus per test** when practical
- **Use descriptive test names**: `should <expected behavior> when <condition>`
- **Parametrize repetitive tests** using `test.each()`
- **Mark slow tests** with tags so they can be skipped
