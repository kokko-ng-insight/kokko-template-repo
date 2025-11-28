# Verify CLAUDE.md Accuracy

Audit CLAUDE.md to ensure it accurately reflects the current state of the codebase.

## Step 1: Read Current CLAUDE.md

Read and understand all instructions currently in CLAUDE.md.

## Step 2: Verify Each Section Against Reality

For each section or instruction in CLAUDE.md:

1. **Repository Context** - Verify the description matches actual project purpose and structure
2. **Package Management** - Check if the specified package manager (uv, npm, pip, etc.) is actually used
   ```bash
   ls pyproject.toml uv.lock package.json pnpm-lock.yaml yarn.lock 2>/dev/null
   ```
3. **Build/Run Commands** - Test that documented commands actually work
4. **File Structure** - Verify any documented paths or directories exist
5. **Dependencies** - Check if mentioned tools/libraries are in dependency files
6. **Configuration** - Verify any documented config files exist and match descriptions

## Step 3: Scan Codebase for Missing Context

Identify important aspects not documented in CLAUDE.md:

1. **Entry Points** - Main files, scripts, or commands to run the application
2. **Testing** - How to run tests, test frameworks used
3. **Environment Setup** - Required environment variables, .env files
4. **Key Patterns** - Architectural patterns, coding conventions used consistently
5. **External Services** - APIs, databases, or services the code interacts with

## Step 4: Check for Outdated Information

Look for:
- References to deleted files or directories
- Deprecated commands or workflows
- Old dependency versions or removed packages
- Obsolete configuration instructions

## Step 5: Update CLAUDE.md

Fix any inaccuracies found:
- Remove outdated or incorrect information
- Add missing critical context
- Update commands that have changed
- Correct file paths or directory structures

## Step 6: Validate Changes

After updates, verify:
- All documented commands execute successfully
- All referenced paths exist
- Instructions are clear and actionable
