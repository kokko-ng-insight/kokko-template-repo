# Version Bump and Release Workflow

## Objective

Increment the patch version (vX.Y.Z to vX.Y.(Z+1)), create a pull request, merge it, and publish a new release.

## Workflow Steps

### 1. Version Detection and Update

1. **Find current version**: Search for version references in:
   - `pyproject.toml` (version field)
   - `package.json` (version field)
   - `src/__init__.py` or `<package>/__init__.py` (__version__ attribute)
   - Any other files containing version strings

2. **Calculate new version**: Increment the patch number (e.g., v0.2.7 to v0.2.8)

3. **Update all version references**: Replace all occurrences of the old version with the new version across all identified files

4. **Verify changes**: Confirm all version references have been updated correctly

### 2. Pull Request Creation

Run the `/pr-create` command to create a pull request with:
- **Title format**: "Bump version to vX.Y.Z"
- **Description**: "Update version from vX.Y.Z to vX.Y.Z across all files"

### 3. Pull Request Merge

Run the `/pr-merge` command to:
- Merge the version bump PR
- Run complete quality assurance pipeline (tests, linting, type checking)
- Use `--admin` flag if needed
- Preserve all commits (no squash)

### 4. Release Creation

After successful merge:

**Prepare comprehensive release notes:**
1. Run `git log <previous-version>..HEAD --oneline` to see all commits since last release
2. Run `git diff <previous-version>..HEAD --stat` to see all changed files
3. Categorize changes into sections:
   - Features: New functionality added
   - Improvements: Enhancements to existing features
   - Bug Fixes: Issues resolved
   - Documentation: Documentation updates
   - Internal: Refactoring, tests, configuration changes
4. List all significant changes with brief descriptions
5. Note any breaking changes or migration requirements

**Create release:**
```bash
gh release create vX.Y.Z \
  --title "Release vX.Y.Z" \
  --notes "$(cat <<'EOF'
## Summary
Brief overview of release

## Changes

### Features
- Feature 1

### Improvements
- Improvement 1

### Bug Fixes
- Fix 1

### Documentation
- Doc update 1

### Internal
- Internal change 1

## Breaking Changes
Note any breaking changes or none
EOF
)" \
  --target main
```

### 5. Package Registry Release (if applicable)

1. **Check CI/CD**: Verify the release workflow has been triggered

```bash
gh run list --limit 1
```

2. **Monitor release progress**: Check the workflow status

```bash
gh run watch
```

3. **Verify completion**: Ensure the release action completes successfully

## Guidelines

**CRITICAL Requirements:**
- **NEVER include emojis** in any commit messages, PR titles, descriptions, or release notes
- **Maintain a concise, professional tone** throughout
- **DO NOT add attribution footers** in any commits or releases
- Update ALL version references consistently across the codebase
- Ensure version format consistency (with or without 'v' prefix as per existing convention)
- Verify quality checks pass before proceeding to release

## Error Handling

- If version detection fails, report the issue and request manual version specification
- If quality checks fail during merge, resolve issues before proceeding to release
- If release workflow does not trigger, investigate CI/CD configuration

## Communication

- Report current version detected
- Confirm new version to be used
- Show status of each step (PR creation, merge, quality checks, release)
- Provide links to created PR, merged commits, and release page
- Confirm successful completion of entire workflow
