---
mode: agent
tools: ['runCommands', 'github']
model: Claude Sonnet 4
---
# Create Pull Request to to-stable-2 Branch

Use GitHub CLI to create a pull request with the current branch targeting the `to-stable-2` branch.

## Instructions

1. **Ensure your branch is ready**
   - All changes have been committed
   - All tests pass: `uv run pytest`
   - All linting/formatting checks pass: `uv run pre-commit run --all-files`
   - Type checking passes: `uv run mypy . --exclude venv`

2. **Push current branch to remote**
   ```bash
   git push origin <current-branch-name>
   ```

3. **Create pull request using GitHub CLI**
   ```bash
   gh pr create --base to-stable-2 --title "<descriptive-title>" --body "<description>"
   ```

## Example

```bash
# Push current feature branch
git push origin feature/user-authentication

# Create PR to to-stable-2
gh pr create --base to-stable-2 --title "Add user authentication system" --body "Implements JWT-based authentication with login/logout endpoints and middleware for protected routes"
```

## Tips

- Use descriptive titles that summarize the main change
- Include relevant details in the PR description
- Reference any related issues using `#issue-number`
- Ensure the PR targets `to-stable-2` branch, not `main`