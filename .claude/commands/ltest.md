# Run Tests and Fix Issues with Atomic Commits

Run tests and linting checks, then fix issues incrementally with separate commits for different types of fixes.

## 1. Initial Assessment
```bash
uv run pytest
uv run pre-commit run --all-files
```

## 2. Fix Issues Atomically

### Test Failures
For each failing test:
1. Fix the underlying issue (not just the test)
2. Verify the fix:
   ```bash
   uv run pytest <specific_test>
   ```
3. Commit the fix:
   ```bash
   git add <affected_files>
   git commit -m "fix(tests): resolve <test_name> failure - <brief_description>"
   ```

### Linting Issues
Group linting fixes by type and commit separately:

**Import/unused variable fixes:**
```bash
git add <files_with_import_fixes>
git commit -m "style(lint): remove unused imports and variables"
```

**Code formatting fixes:**
```bash
git add <files_with_formatting_fixes>
git commit -m "style(format): apply code formatting corrections"
```

**Code style violations:**
```bash
git add <files_with_style_fixes>
git commit -m "style(lint): fix code style violations"
```

## 3. Iterative Process
Repeat the assessment and fixing process until all checks pass:
```bash
uv run pytest
uv run pre-commit run --all-files
```

## 4. Final Verification
Once all issues are resolved, run a final comprehensive check:
```bash
uv run pytest && uv run pre-commit run --all-files
```

**Note**: Do not implement any slow tests or remove slow tests if you encounter them.
