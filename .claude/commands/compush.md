# Prompt: Generate, Commit, and Push with Git

## Instructions

1. **Assess the scope of changes**
    - If there are extensive changes, break them into logical groups
    - Each commit should represent a cohesive set of related changes
    - Consider grouping by: feature, bug fix, refactoring, documentation, tests

2. **Security check - Prevent secrets from being committed**
    - Review all staged files for sensitive information before committing
    - Look for: API keys, passwords, tokens, database credentials, private keys
    - Check configuration files, environment files, and code comments
    - Use `git diff --cached` to review what will be committed
    - If secrets are found, remove them and use environment variables or secure vaults instead

3. **Write a concise and descriptive git commit message**
    - Summarize the changes made.
    - Use the imperative mood (e.g., "Add feature", "Fix bug", "Update docs").
    - Keep the first line under 72 characters.

4. **Commit your changes**
    - For small changes:
      ```sh
      git add .
      git commit -m "<your commit message>"
      ```
    - For extensive changes, commit incrementally:
      ```sh
      git add <specific files or directories>
      git commit -m "<specific commit message>"
      # Repeat for each logical group
      ```

5. **Push your commits to the remote repository**
    ```sh
    git push
    ```

## Examples

### Single Commit (Small Changes)
1. **Commit message:**
    ```
    Add user authentication to login endpoint
    ```

2. **Commands:**
    ```sh
    git add .
    git commit -m "Add user authentication to login endpoint"
    git push
    ```

### Multiple Commits (Extensive Changes)
1. **Incremental commits:**
    ```sh
    # Commit core functionality first
    git add src/auth/
    git commit -m "Add authentication service and middleware"

    # Commit tests separately
    git add tests/auth/
    git commit -m "Add authentication tests"

    # Commit documentation
    git add docs/auth.md
    git commit -m "Add authentication documentation"

    # Push all commits
    git push
    ```
