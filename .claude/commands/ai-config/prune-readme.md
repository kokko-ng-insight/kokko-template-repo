# Prune README.md

Reduce README.md to essential information for developer onboarding. Target: concise, scannable, actionable.

## Principles for Pruning

Keep information that:
- **Enables quick start** (clone, install, run in under 5 minutes)
- **Explains the purpose** (what this project does, one paragraph max)
- **Shows usage** (basic examples, common commands)
- **Points to more info** (links to detailed docs, not duplicated content)

Remove information that:
- Duplicates information available elsewhere (package.json scripts, inline code comments)
- Is obvious from the code or file structure
- Contains excessive examples when one suffices
- Includes outdated badges or status indicators
- Has verbose explanations that could be one-liners

## Step 1: Analyze Current Size

```bash
wc -l README.md
```

## Step 2: Categorize Content by Priority

**Priority 1 - Must Keep:**
- Project name and one-line description
- Prerequisites (language version, required tools)
- Installation steps
- Basic usage/run command

**Priority 2 - Keep if Space Allows:**
- Configuration options (brief)
- Common troubleshooting
- Contributing guidelines (or link)
- License

**Priority 3 - Remove:**
- Lengthy architecture explanations (move to docs/)
- Multiple usage examples (keep one, link to more)
- Changelog content (use CHANGELOG.md)
- Verbose feature lists
- Screenshots that don't aid understanding

## Step 3: Apply Compression Techniques

1. **Use tables** for option/config documentation
2. **Single code block** for install + run (copy-paste friendly)
3. **Link to docs** instead of duplicating documentation
4. **Remove badges** that don't provide useful information
5. **Collapse optional sections** using details/summary if supported

## Step 4: Restructure for Scanning

Optimal README structure:
```
# Project Name
One-line description

## Quick Start
Prerequisites, install, run - all in one place

## Usage
Most common command or API example

## Configuration
Table or brief list (optional)

## Documentation
Links to detailed docs

## License
One line
```

## Step 5: Validate Final Size

```bash
wc -l README.md
```

Target: Under 100 lines for simple projects, under 200 for complex ones.

## Step 6: Test Effectiveness

Ask: "Could a new developer go from clone to running in 5 minutes with only this README?"
- If yes, pruning is complete
- If no, add back the minimum needed steps
