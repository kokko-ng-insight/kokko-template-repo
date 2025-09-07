# Find and Fix mypy Errors

1. Run mypy to check for type errors in your codebase:
   ```bash
   uv run mypy .
   ```

2. Review the output for any reported errors. Create a working list of errors to fix.

3. **Fix errors one at a time** to maintain atomic commits:
   - Choose one error from the list
   - Update your code to fix the specific type issue
   - Run mypy again to verify the fix:
     ```bash
     uv run mypy <affected_file>
     ```
   - If clean, commit the fix:
     ```bash
     git add <affected_file>
     git commit -m "fix(types): resolve <error_description> in <file>:<line>"
     ```

4. **Repeat for each error** until no errors are reported:
   ```bash
   uv run mypy .
   ```

5. **Handle complex type fixes**:
   - For widespread type changes across multiple files, group by logical component
   - Commit each component separately with descriptive messages
   - Examples:
     ```bash
     git commit -m "fix(types): add return type annotations to auth module"
     git commit -m "fix(types): resolve Optional vs None handling in database layer"
     ```

**Note**: You can ignore issues with external dependencies by modifying pyproject.toml
