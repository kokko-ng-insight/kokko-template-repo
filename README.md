# Kokko's AI Project Template

Currently defaulting to Claude Sonnet 4 for all AI-assisted coding.

Run `uv init` to initialize the project.

Run `uv run pre-commit install`. If this doesn't work, run `uv run python -m pre_commit install` - this will ensure that the entire codebase is linted every time you commit using git hooks.

Add dev dependencies: `uv add vulture mypy --group dev` - this is needed for some of the pre-written prompts.

**Notes**
- I don't use Claude Code hooks on purpose. I don't want the agent's context flooded with lint fixes.
- When the codebase is stable enough, I ask AI to create at least 40% code coverage in pytest with no long-running tests. This ensures stability when multiple people are working on the codebase.
- My go-to stack right now is FAB (Flask, Alpine, Bootstrap) - concise libraries with a focus on Python. This is just a personal preference - feel free to modify the prompts to fit your stack.

**My typical workflow is:**
1. Add features using Claude Code/Github Copilot + live review changes
2. Run /mypy /ltest /vulture /ltest
3. Run /compush

**Workflow for merging PRs:**
1. Install Github MCP in Claude Code and Github Copilot
2. Create branch to-stable-2
3. Run /pr-merge - note that this will only be effective if you have good coverage using pytest (see earlier note about increasing pytest coverage for stability)

**Misc Tips:**
1. Use highly starred libraries with lots of high-quality public code. For APIs that change fast, use the #fetch tool on Github Copilot or ask Claude Code to look at a specific docs link and load the latest syntax of the API you're going to use in its context.
2. Feedback loops using curl for APIs and Playwright MCP for UIs are the fastest way to get results.
3. ACTUALLY READ THE CODE. Prod code is for AI-assisted programming, not for *vibe coding*.

**Thoughts I still have to add here:**
- Preventing context rot - customizing tools for prompts, figuring out how much guidance a specific model needs. The less guidance, the less cognitive load there is on you.
- Understanding Bash tools in the CLI Agent era is a superpower. Still diving around this part of the internet. Think mysterious Linux sysadmin vibes.
- Understanding codebase architecture is honestly the skill issue a lot of vibe coders have. Modularity, targeted DRYness, and abstractions using SOLID principles go a long way. Think of your codebase as a bunch of mini codebases. This is helpful for both LLMs and humans grokking your code.
