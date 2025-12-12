# C4 Architecture Update

Update the existing C4 model based on code changes since it was last generated.

## Prerequisites

C4 model must exist in `codemap/` folder. If not, run `/viz/c4-map` first.

## Instructions

### Step 1: Identify Changes

Run these commands to identify what changed:

```bash
# Get last modified date of C4 model
find codemap -type f -name "*.puml" -o -name "*.md" | head -20

# Find files changed since C4 model was created
# Use the oldest codemap file's date as reference
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" \) -newer codemap/level1-context/context.md 2>/dev/null | grep -v node_modules | grep -v __pycache__
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

**Context-level changes** (affects `codemap/level1-context/`):
- New external integrations added
- External services removed
- New user types or actors

**Container-level changes** (affects `codemap/level2-containers/`):
- New services/applications added
- Services removed or merged
- Technology stack changes (new frameworks, databases)
- New inter-service communication

**Component-level changes** (affects `codemap/level3-components/`):
- New modules/packages added
- Modules removed or renamed
- Component responsibility changes
- New dependencies between components

**Code-level changes** (affects `codemap/level4-code/`):
- New key classes added
- Class hierarchy changes
- New design patterns introduced
- Interface changes

### Step 3: Spawn Update Subagents

Based on the categorized changes, spawn parallel Explore subagents ONLY for affected levels.

**If context-level changes detected:**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Update C4 context level"
  prompt: |
    TASK: Update the SYSTEM CONTEXT level based on recent code changes.

    CHANGED FILES: [insert list from Step 1]

    EXPLORATION GOALS:
    1. Read the current codemap/level1-context/context.md to understand existing state
    2. Analyze the changed files for:
       - New external service integrations (HTTP clients, SDKs)
       - Removed external dependencies
       - New user types or authentication methods
    3. Identify what needs to be added/removed/modified in the diagram

    SEARCH STRATEGY:
    - Read each changed file to understand the change
    - Grep for new import statements related to external services
    - Check for new environment variable references
    - Compare against existing external systems in context.md

    OUTPUT FORMAT:
    Return:
    - Updated C4-PlantUML Context diagram (full replacement)
    - Change summary: what was added/removed/modified
    - List of files that triggered each change
```

**If container-level changes detected:**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Update C4 container level"
  prompt: |
    TASK: Update the CONTAINER level based on recent code changes.

    CHANGED FILES: [insert list from Step 1]

    EXPLORATION GOALS:
    1. Read the current codemap/level2-containers/containers.md to understand existing state
    2. Analyze the changed files for:
       - New services or applications added
       - Services removed or consolidated
       - Technology stack updates (new dependencies in package files)
       - New inter-service communication patterns
    3. Identify what needs to be added/removed/modified in the diagram

    SEARCH STRATEGY:
    - Check if any new Dockerfile or docker-compose entries exist
    - Read changed package.json/requirements.txt for new major dependencies
    - Look for new main entry points or server configurations
    - Find new API routes or queue consumers

    OUTPUT FORMAT:
    Return:
    - Updated C4-PlantUML Container diagram (full replacement)
    - Change summary: what was added/removed/modified
    - Updated technology stack table
```

**If component-level changes detected:**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Update C4 component level"
  prompt: |
    TASK: Update the COMPONENT level based on recent code changes.

    CHANGED FILES: [insert list from Step 1]

    EXPLORATION GOALS:
    1. Read the current codemap/level3-components/components.md to understand existing state
    2. Analyze the changed files for:
       - New modules or packages created
       - Modules removed or renamed
       - Changed responsibilities (significant refactoring)
       - New inter-component dependencies
    3. Identify what needs to be added/removed/modified in the diagrams

    SEARCH STRATEGY:
    - Check for new top-level directories
    - Analyze import statement changes
    - Look for new __init__.py or index.ts files
    - Identify moved or renamed modules

    OUTPUT FORMAT:
    Return:
    - Updated C4-PlantUML Component diagrams (full replacement for affected containers)
    - Change summary: what was added/removed/modified
    - Updated dependency matrix
```

**If code-level changes detected:**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Update C4 code level"
  prompt: |
    TASK: Update the CODE level based on recent code changes.

    CHANGED FILES: [insert list from Step 1]

    EXPLORATION GOALS:
    1. Read the current codemap/level4-code/code.md to understand existing state
    2. Analyze the changed files for:
       - New key classes or interfaces
       - Changed class hierarchies
       - New design patterns introduced
       - Significant method signature changes
    3. Identify what needs to be added/removed/modified in the diagrams

    SEARCH STRATEGY:
    - Read the changed class definitions
    - Check for new inheritance relationships
    - Identify new pattern implementations
    - Look for new abstract base classes

    OUTPUT FORMAT:
    Return:
    - Updated PlantUML class diagrams (full replacement for affected components)
    - Change summary: what was added/removed/modified
    - Updated design patterns table
```

### Step 4: Apply Updates

For each subagent that returns updates:

1. Update the .puml diagram files with new PlantUML code
2. Update the corresponding .md documentation file
3. Add update timestamp to file headers

**PlantUML files to update:**
- `codemap/level1-context/context.puml` - Context level diagram
- `codemap/level2-containers/containers.puml` - Container level diagram
- `codemap/level3-components/components-*.puml` - Component level diagrams
- `codemap/level4-code/code-*.puml` - Code level class diagrams

**Markdown files to update:**
- `codemap/level1-context/context.md` - Context documentation
- `codemap/level2-containers/containers.md` - Container documentation
- `codemap/level3-components/components.md` - Component documentation
- `codemap/level4-code/code.md` - Code documentation

Update format for markdown files:
```markdown
<!-- Last updated: YYYY-MM-DD -->
<!-- Changes: brief summary of what changed -->
```

### Step 5: Regenerate PNG Exports

After updating .puml files, regenerate the PNG exports:

```bash
# Regenerate PNGs for updated levels
plantuml -tpng codemap/level1-context/*.puml
plantuml -tpng codemap/level2-containers/*.puml
plantuml -tpng codemap/level3-components/*.puml
plantuml -tpng codemap/level4-code/*.puml
```

If PlantUML CLI is not available, note this in the output and provide instructions for manual PNG generation.

### Step 6: Update Index

Update `codemap/README.md` with:
- New last-updated timestamp
- Summary of changes made
- List of files modified (both .puml, .png, and .md)

## Output

After updates are applied, output:

```markdown
# C4 Update Summary

## Files Modified
- [ ] codemap/level1-context/context.puml - [changes or "no changes"]
- [ ] codemap/level1-context/context.png - [regenerated or "no changes"]
- [ ] codemap/level1-context/context.md - [changes or "no changes"]
- [ ] codemap/level2-containers/containers.puml - [changes or "no changes"]
- [ ] codemap/level2-containers/containers.png - [regenerated or "no changes"]
- [ ] codemap/level2-containers/containers.md - [changes or "no changes"]
- [ ] codemap/level3-components/components-*.puml - [changes or "no changes"]
- [ ] codemap/level3-components/components-*.png - [regenerated or "no changes"]
- [ ] codemap/level3-components/components.md - [changes or "no changes"]
- [ ] codemap/level4-code/code-*.puml - [changes or "no changes"]
- [ ] codemap/level4-code/code-*.png - [regenerated or "no changes"]
- [ ] codemap/level4-code/code.md - [changes or "no changes"]

## Changes Applied
[Summary of architectural changes detected and applied]

## Files Analyzed
[List of source files that triggered updates]

## Recommendation
[Any manual review needed or follow-up actions]

## Rendering Updated Diagrams
Run the following to regenerate all PNGs:
```bash
plantuml -tpng codemap/level1-context/*.puml
plantuml -tpng codemap/level2-containers/*.puml
plantuml -tpng codemap/level3-components/*.puml
plantuml -tpng codemap/level4-code/*.puml
```
```
