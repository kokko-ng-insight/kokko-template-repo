# Prune CLAUDE.md

Reduce CLAUDE.md to only the most essential information for effective agent performance. Target: 300 lines maximum.

## Principles for Pruning

Keep information that:
- **Directly affects code generation** (coding standards, patterns to follow)
- **Prevents common mistakes** (critical gotchas, forbidden patterns)
- **Enables task completion** (how to build, test, run)
- **Is unique to this project** (not general knowledge)

Remove information that:
- Claude already knows (general best practices, language syntax)
- Is redundant or repeated
- Is too verbose when a shorter version suffices
- Describes obvious project structure
- Contains examples that can be inferred from code

## Step 1: Analyze Current Size

```bash
wc -l CLAUDE.md
```

## Step 2: Categorize Content by Priority

**Priority 1 - Must Keep:**
- Project-specific commands (build, test, run)
- Critical constraints or requirements
- Non-obvious architectural decisions
- Environment setup essentials

**Priority 2 - Keep if Space Allows:**
- Code style preferences beyond linting
- Common gotchas specific to this codebase
- Key file locations for important modules

**Priority 3 - Remove:**
- General programming advice
- Lengthy explanations of standard tools
- Verbose examples when terse ones work
- Aspirational guidelines not enforced

## Step 3: Apply Compression Techniques

1. **Consolidate related points** into single concise statements
2. **Use bullet points** instead of paragraphs
3. **Remove filler words** and unnecessary qualifiers
4. **Replace examples with patterns** where possible
5. **Link to docs** instead of duplicating documentation
6. **Use code blocks sparingly** - only for non-obvious commands

## Step 4: Restructure for Scanning

Organize remaining content:
```
# CLAUDE.md
## Quick Reference (commands, key paths)
## Constraints (must-follow rules)
## Patterns (how things are done here)
## Gotchas (common mistakes to avoid)
```

## Step 5: Validate Final Size

```bash
wc -l CLAUDE.md
```

Target: Under 300 lines while retaining all critical information.

## Step 6: Test Effectiveness

Ask: "Could an agent complete common tasks with only this CLAUDE.md?"
- If yes for all critical workflows, pruning is complete
- If no, add back the minimum needed context
