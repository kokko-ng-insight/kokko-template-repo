# Honest Code Review

Perform a brutally honest code review. Do not soften feedback or use diplomatic language. State problems directly.

## Review Scope

Review the code changes or files specified. If none specified, review recent uncommitted changes.

## Review Criteria

**Correctness**
- Does this code actually work? Are there edge cases that will break it?
- Are there logic errors or off-by-one mistakes?
- Will this fail silently or produce wrong results?

**Design Problems**
- Is this the wrong approach entirely?
- Is this over-engineered for what it does?
- Is this under-engineered and will cause problems later?
- Does this duplicate existing functionality?

**Code Quality**
- Is this code hard to read or understand?
- Are the names misleading or unclear?
- Is the structure confusing?
- Would you struggle to debug this at 3am?

**Security & Reliability**
- Are there obvious security holes?
- Will this break under load or unusual conditions?
- Are errors handled properly or swallowed?

**Maintenance Burden**
- Will future developers curse this code?
- Is this adding unnecessary complexity?
- Does this violate established patterns in the codebase?

## Output Format

Be direct. No praise sandwiches. No "great job but...". Just state the issues.

**Critical Issues** - Things that must be fixed before merge
**Problems** - Things that should be fixed but won't cause immediate harm
**Concerns** - Things worth discussing or reconsidering
**Verdict** - APPROVE, NEEDS CHANGES, or REJECT with a one-line summary

Example output style:
```
CRITICAL: The SQL query on line 45 is vulnerable to injection.
PROBLEM: The function `processData` does three unrelated things.
CONCERN: This adds a new dependency for something achievable with stdlib.
VERDICT: NEEDS CHANGES - Fix the SQL injection, consider splitting processData.
```

Do not add false positives to appear thorough. If the code is genuinely good, say so briefly and move on.
