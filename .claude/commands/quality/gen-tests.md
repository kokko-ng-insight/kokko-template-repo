# Generate Tests

Generate comprehensive tests for this codebase, including both unit/integration tests (pytest) and end-to-end browser tests (pytest-playwright).

## Step 1: Analyze Existing Test Coverage

1. Check if tests exist:
   ```bash
   uv run pytest --collect-only 2>/dev/null || echo "No tests found"
   ```

2. If tests exist, run coverage analysis:
   ```bash
   uv run pytest --cov=. --cov-report=term-missing --cov-report=html
   ```

3. Identify untested or under-tested modules by reviewing the coverage report.

## Step 2: Generate Unit/Integration Tests (pytest)

For each module or function lacking coverage:

1. **Analyze the code** - understand inputs, outputs, side effects, and edge cases
2. **Create test file** - follow the naming convention `tests/test_<module_name>.py`
3. **Write tests covering**:
   - Happy path scenarios
   - Edge cases (empty inputs, boundary values, None/null handling)
   - Error conditions and exception handling
   - Any mocked external dependencies (APIs, databases, file I/O)

4. **Use fixtures** for common setup/teardown in `tests/conftest.py`

5. **Run and verify**:
   ```bash
   uv run pytest tests/test_<module_name>.py -v
   ```

## Step 3: Generate E2E Browser Tests (pytest-playwright)

If the project has web routes/UI components:

1. **Create E2E test directory**: `tests/e2e/`

2. **Create conftest.py for Playwright**:
   ```python
   import pytest
   from playwright.sync_api import Page

   @pytest.fixture(scope="session")
   def browser_context_args(browser_context_args):
       return {**browser_context_args, "viewport": {"width": 1280, "height": 720}}
   ```

3. **Write E2E tests** in `tests/e2e/test_<feature>.py`:
   - Test critical user flows (login, form submissions, navigation)
   - Test UI state changes and interactions
   - Test API responses via the browser
   - Use `page.goto()`, `page.click()`, `page.fill()`, `expect()` assertions

4. **Run Playwright tests**:
   ```bash
   uv run pytest tests/e2e/ --headed  # visible browser
   uv run pytest tests/e2e/           # headless
   ```

## Step 4: Increase Coverage (if tests already exist)

1. Review the coverage report from Step 1
2. Focus on:
   - Lines marked as uncovered (red in HTML report)
   - Branches not taken
   - Functions with 0% coverage
3. Add targeted tests for these gaps
4. Re-run coverage until target is met (aim for 80%+ coverage)

## Step 5: Validate All Tests Pass

```bash
uv run pytest -v --tb=short
uv run pytest --cov=. --cov-fail-under=70
```

## Guidelines

- **Do not mock what you don't own** - prefer integration tests for your own code
- **Keep tests fast** - mock slow external services
- **One assertion per test** when practical, or group related assertions
- **Use descriptive test names**: `test_<function>_<scenario>_<expected_result>`
- **Parametrize repetitive tests** using `@pytest.mark.parametrize`
- **Mark slow tests** with `@pytest.mark.slow` so they can be skipped with `-m "not slow"`
