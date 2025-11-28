# Full Quality Assurance Pipeline

Run comprehensive quality checks and validation across the entire codebase.

**Do not stop until all checks pass.**

## Step 1: Code Quality

```bash
# Python linting and formatting
uv run pre-commit run --all-files

# Type checking
uv run mypy . --exclude .venv

# Security scanning
uv run bandit -r . -x .venv,tests
```

## Step 2: Test Suite

```bash
# Run all tests with coverage
uv run pytest --cov=. --cov-report=term-missing -v

# Run any slow/integration tests if present
uv run pytest -m "slow or integration" -v 2>/dev/null || true
```

## Step 3: Dependency Audit

```bash
# Check for known vulnerabilities (if pip-audit installed)
uv run pip-audit 2>/dev/null || true

# Verify lock file is up to date
uv lock --check 2>/dev/null || true
```

## Step 4: Build Verification

If applicable, verify the project builds:

```bash
# Python package build
uv build 2>/dev/null || true

# Docker build (if Dockerfile exists)
if [ -f Dockerfile ]; then
  docker build -t qa-test . --quiet
fi
```

## Step 5: Documentation Check

- Verify README.md is accurate and up-to-date
- Check that all public APIs are documented
- Ensure CHANGELOG.md reflects recent changes (if exists)

## Step 6: Git Hygiene

```bash
# Check for uncommitted changes
git status

# Verify no secrets in codebase
git secrets --scan 2>/dev/null || true
```

## Failure Handling

For each failure encountered:
1. Identify the root cause
2. Implement the fix
3. Re-run the failing check
4. Continue until all checks pass

## Completion Criteria

All checks must pass:
- [ ] Pre-commit hooks pass
- [ ] Type checking passes
- [ ] All tests pass
- [ ] No security vulnerabilities
- [ ] Build succeeds
- [ ] No uncommitted changes

**Continue debugging and fixing until everything passes.**
