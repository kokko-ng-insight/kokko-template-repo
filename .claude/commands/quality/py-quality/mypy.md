# Find and Fix mypy Errors

Use mypy to enforce strict type checking across the Python codebase.

## 1. Run Type Check

Standard check:
```bash
uv run mypy .
```

Strict mode (recommended):
```bash
uv run mypy --strict .
```

## 2. Review Output

For each error, note:
- File path and line number
- Error code (e.g., [arg-type], [return-value], [no-untyped-def])
- Error description

## 3. Common Type Errors and Fixes

- **[no-untyped-def]** -> Add type annotations to function parameters and return type
- **[arg-type]** -> Fix argument type mismatch or add type narrowing
- **[return-value]** -> Ensure return type matches annotation
- **[assignment]** -> Variable type doesn't match assigned value
- **[union-attr]** -> Add None check before accessing attribute
- **[no-any-return]** -> Avoid returning Any, use explicit types
- **[type-arg]** -> Provide type arguments for generic types

## 4. Fix Iteratively

For each error:
1. Update code to fix the type issue
2. Re-run type check to verify:
   ```bash
   uv run mypy .
   ```
3. Commit when a file is clean:
   ```bash
   git add <file>
   git commit -m "fix(types): resolve mypy errors in <file>"
   ```

## 5. Strict Mode Settings

For maximum strictness, ensure `pyproject.toml` includes:
```toml
[tool.mypy]
python_version = "3.12"
strict = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
disallow_untyped_decorators = true
check_untyped_defs = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_return_any = true
no_implicit_reexport = true
```

## 6. Avoiding `Any` Types

**CRITICAL**: The `Any` type defeats the purpose of type checking and must be avoided unless absolutely necessary.

### Never acceptable reasons to use `Any`:
- "It's faster to implement"
- "The types are too complex"
- "Context window constraints" (work continues through auto-compaction)
- "I'll fix it later"

### Acceptable (rare) exceptions:
- Interfacing with untyped third-party libraries (prefer creating stubs)
- Dynamic plugin/callback systems where types are truly unknowable at compile time
- Compatibility with legacy code during migration (must have a plan to remove)

### Preferred alternatives to `Any`:
- `object` - when you need the base type of all objects
- `Unknown` - import from typing, forces type narrowing before use
- Generics (`TypeVar`, `Generic[T]`) - for polymorphic code
- `Union[X, Y, ...]` - when the type is one of several known types
- Protocol classes - for structural typing / duck typing
- `Callable[..., ReturnType]` - for callable with unknown args but known return

### Finding and eliminating `Any`:
```bash
# Find explicit Any usage
grep -rn ": Any" scholarship_app/ --include="*.py"
grep -rn "-> Any" scholarship_app/ --include="*.py"

# Check for implicit Any in mypy output
uv run mypy --strict . 2>&1 | grep "Any"
```

## 7. Gradual Adoption Strategy

If strict mode produces too many errors initially:

1. Start with per-module strict checking:
   ```bash
   uv run mypy --strict scholarship_app/api/
   ```

2. Add `# type: ignore[error-code]` comments sparingly with justification (never for Any-related errors without exhausting alternatives)

3. Track progress by counting errors:
   ```bash
   uv run mypy . 2>&1 | grep -c "error:"
   ```

## 8. Final Validation

```bash
uv run mypy --strict .
uv run pytest
```

Goal: Zero mypy errors with strict mode enabled.