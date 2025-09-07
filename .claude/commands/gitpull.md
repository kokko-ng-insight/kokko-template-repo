# Prompt: Pull Changes from Main Branch and Resolve Merge Conflicts

## Instructions

1. **Fetch the latest changes from the remote repository**
    ```sh
    git fetch origin
    ```

2. **Switch to main branch and pull latest changes**
    ```sh
    git checkout main
    git pull origin main
    ```

3. **Switch back to current working branch**
    ```sh
    git checkout -
    ```

4. **Merge or rebase main into current branch**
    Choose one of the following strategies:

    **Option A: Merge (preserves commit history)**
    ```sh
    git merge main
    ```

    **Option B: Rebase (cleaner linear history)**
    ```sh
    git rebase main
    ```

5. **If merge conflicts occur, resolve them atomically:**
    - Identify conflicted files: `git status`
    - **For each conflicted file individually:**
        1. Open the file and resolve conflicts manually
        2. Look for conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
        3. Edit the file to resolve conflicts, keeping the desired changes
        4. Stage the resolved file: `git add <resolved-file>`
        5. Create an atomic commit for this specific conflict resolution:
           ```bash
           git commit -m "resolve: merge conflict in <filename> - <brief_description>"
           ```
    - **After all conflicts are resolved individually:**
        - For merge: Complete with `git merge --continue` (if needed)
        - For rebase: Continue with `git rebase --continue`

6. **Verify the merge/rebase was successful**
    ```sh
    git status
    git log --oneline -10
    ```

7. **Run tests to ensure everything still works**
    ```sh
    uv run pytest
    uv run pre-commit run --all-files
    ```

8. **Push the updated branch**
    ```sh
    git push origin <current-branch-name>
    ```

## Conflict Resolution Tips

- **Understanding conflict markers:**
    - `<<<<<<< HEAD` - Your current branch changes
    - `=======` - Separator
    - `>>>>>>> main` - Main branch changes

- **Common resolution strategies:**
    - Keep both changes (merge them logically)
    - Keep only main branch changes
    - Keep only current branch changes
    - Create a new solution that combines the best of both

- **Tools to help:**
    - `git diff` - See differences
    - `git log --oneline main..HEAD` - See commits unique to current branch
    - `git log --oneline HEAD..main` - See commits unique to main

## Example Workflow

```sh
# Fetch latest changes
git fetch origin

# Update main branch
git checkout main
git pull origin main

# Go back to feature branch
git checkout feature/my-feature

# Merge main into feature branch
git merge main

# If conflicts occur, resolve them atomically:
# For each conflicted file:
git add specific-file.py
git commit -m "resolve: merge conflict in specific-file.py - kept both feature and main changes"
# Repeat for each file, then continue merge if needed

# Run tests
uv run pytest

# Push updated branch
git push origin feature/my-feature
