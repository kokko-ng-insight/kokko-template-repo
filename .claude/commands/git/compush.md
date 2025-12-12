# Prompt: Generate, Commit, and Push with Git

## Instructions

1. **Security Check: Scan for secrets using static analysis**
    - **CRITICAL**: Before committing, run a static analysis tool to detect secrets:

    **Option A: detect-secrets (recommended)**
    ```bash
    # Install if needed: pip install detect-secrets
    # Scan staged files for secrets
    git diff --cached --name-only | xargs detect-secrets scan --list-all-secrets
    ```

    **Option B: gitleaks**
    ```bash
    # Install if needed: brew install gitleaks (macOS) or download from GitHub
    # Scan staged changes
    gitleaks detect --staged --verbose
    ```

    **Option C: trufflehog**
    ```bash
    # Install if needed: brew install trufflehog (macOS)
    # Scan staged changes
    git diff --cached | trufflehog --json filesystem --staged
    ```

    - The tool will detect:
      - API keys, tokens, passwords
      - Private keys, certificates
      - Connection strings, database credentials
      - AWS/Azure/GCP credentials
      - High-entropy strings that may be secrets
    - **If secrets are found**: Remove them immediately, use environment variables or secret management instead
    - **NEVER commit or push files containing secrets**
    - For false positives, add to `.secrets.baseline` (detect-secrets) or `.gitleaksignore` (gitleaks)

2. **Assess the scope of changes**
    - If there are extensive changes, break them into logical groups
    - Each commit should represent a cohesive set of related changes
    - Consider grouping by: feature, bug fix, refactoring, documentation, tests

3. **Write a commit message using Conventional Commits format**
    - Use the format: `<type>(<scope>): <description>`
    - **Types** (required):
      - `feat`: New feature or functionality
      - `fix`: Bug fix
      - `docs`: Documentation changes only
      - `style`: Code style changes (formatting, whitespace)
      - `refactor`: Code refactoring without behavior change
      - `perf`: Performance improvements
      - `test`: Adding or modifying tests
      - `chore`: Build process, dependencies, or tooling changes
      - `security`: Security-related changes
      - `ci`: CI/CD configuration changes
    - **Scope** (optional): Component or module affected (e.g., `auth`, `api`, `db`)
    - **Description**: Use imperative mood, keep under 50 characters
    - Keep the full first line under 72 characters
    - **NEVER include emojis in commit messages**
    - **Maintain a concise, professional tone**
    - **DO NOT add attribution footers** (e.g., no "Generated with Claude Code" or "Co-Authored-By: Claude")

    **Examples:**
    ```
    feat(auth): add JWT token refresh endpoint
    fix(db): resolve connection pool exhaustion
    refactor(api): simplify request validation logic
    docs: update API endpoint documentation
    chore(deps): upgrade FastAPI to 0.110.0
    security(auth): sanitize user input in login
    ```

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
    feat(auth): add user authentication to login endpoint
    ```

2. **Commands:**
    ```sh
    git add .
    git commit -m "feat(auth): add user authentication to login endpoint"
    git push
    ```

### Multiple Commits (Extensive Changes)
1. **Incremental commits:**
    ```sh
    # Commit core functionality first
    git add src/auth/
    git commit -m "feat(auth): add authentication service and middleware"

    # Commit tests separately
    git add tests/auth/
    git commit -m "test(auth): add authentication unit tests"

    # Commit documentation
    git add docs/auth.md
    git commit -m "docs(auth): add authentication documentation"

    # Push all commits
    git push
    ```

### Bug Fix Example
```sh
git add .
git commit -m "fix(api): resolve null pointer in request handler"
git push
```

### Refactoring Example
```sh
git add .
git commit -m "refactor(db): extract query builder into separate module"
git push
```
