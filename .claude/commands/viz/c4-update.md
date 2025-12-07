# C4 Architecture Update

Update the existing C4 model based on code changes since it was last generated.

## Prerequisites

C4 model must exist in `codemap/` folder. If not, run `/viz/c4-map` first.

## Instructions

### Step 1: Identify Changes

Run these commands to identify what changed:

```bash
# Get last modified date of C4 model
ls -la codemap/

# Find files changed since C4 model was created
# Use the oldest codemap file's date as reference
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" \) -newer codemap/context.md 2>/dev/null | grep -v node_modules | grep -v __pycache__
```

Also check git history:
```bash
# Get commit hash when codemap was last updated
git log -1 --format="%H" -- codemap/

# Show all changes since then
git diff --name-status <commit_hash>..HEAD -- . ':!codemap'
```

### Step 2: Categorize Changes

Group the changed files by impact level:

**Context-level changes** (affects `codemap/context.md`):
- New external integrations added
- External services removed
- New user types or actors

**Container-level changes** (affects `codemap/containers.md`):
- New services/applications added
- Services removed or merged
- Technology stack changes (new frameworks, databases)
- New inter-service communication

**Component-level changes** (affects `codemap/components.md`):
- New modules/packages added
- Modules removed or renamed
- Component responsibility changes
- New dependencies between components

**Code-level changes** (affects `codemap/code.md`):
- New key classes added
- Class hierarchy changes
- New design patterns introduced
- Interface changes

### Step 3: Spawn Update Agents

Based on the categorized changes, spawn parallel agents ONLY for affected levels.

If context-level changes detected:
```
Review changes affecting the SYSTEM CONTEXT level:

Changed files: [list from Step 1]

1. Read the current codemap/context.md
2. Analyze the changed files for new/removed external integrations
3. Update the C4Context diagram accordingly
4. Preserve unchanged elements

Return: Updated context.md content with change summary
```

If container-level changes detected:
```
Review changes affecting the CONTAINER level:

Changed files: [list from Step 1]

1. Read the current codemap/containers.md
2. Analyze the changed files for new/removed services
3. Check for technology stack updates (package.json, requirements.txt changes)
4. Update the C4Container diagram accordingly

Return: Updated containers.md content with change summary
```

If component-level changes detected:
```
Review changes affecting the COMPONENT level:

Changed files: [list from Step 1]

1. Read the current codemap/components.md
2. Analyze new/removed/renamed modules
3. Check for dependency changes (import statements)
4. Update the C4Component diagrams accordingly

Return: Updated components.md content with change summary
```

If code-level changes detected:
```
Review changes affecting the CODE level:

Changed files: [list from Step 1]

1. Read the current codemap/code.md
2. Analyze new/changed classes and interfaces
3. Check for pattern changes
4. Update class diagrams accordingly

Return: Updated code.md content with change summary
```

### Step 4: Apply Updates

For each agent that returns updates:

1. Read the current file from `codemap/`
2. Apply the changes
3. Add update timestamp to the file header

Update format for each file:
```markdown
<!-- Last updated: YYYY-MM-DD -->
<!-- Changes: brief summary of what changed -->
```

### Step 5: Update Index

Update `codemap/README.md` with:
- New last-updated timestamp
- Summary of changes made
- List of files modified

## Output

After updates are applied, output:

```markdown
# C4 Update Summary

## Files Modified
- [ ] codemap/context.md - [changes or "no changes"]
- [ ] codemap/containers.md - [changes or "no changes"]
- [ ] codemap/components.md - [changes or "no changes"]
- [ ] codemap/code.md - [changes or "no changes"]

## Changes Applied
[Summary of architectural changes detected and applied]

## Files Analyzed
[List of source files that triggered updates]

## Recommendation
[Any manual review needed or follow-up actions]
```
