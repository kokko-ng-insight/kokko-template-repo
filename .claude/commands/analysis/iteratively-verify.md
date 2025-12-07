# Autonomous Web App Development and Validation

Work autonomously to validate the application end-to-end per all User Stories in `spec.md`. Resolve all remaining issues until fully functional.

**You cannot stop until everything in `spec.md` is implemented and validated.**

## Autonomous Work Expectations

- **Do not stop early** - work until everything is complete
- **Do not stop** tasks due to token budget concerns
- **Complete tasks fully**, even if end of budget is approaching
- **Never artificially stop** any task early regardless of context remaining

## Required Work Cycle

For **each and every** feature in `spec.md`:

1. **Validate** - Test the feature thoroughly
2. **Debug** - Identify any issues found
3. **Implement** - Code fixes and features as needed
4. **Unblock** - Resolve all problems
5. **Re-validate** - Confirm feature is fully functional
6. **Repeat** - Move to next feature until all complete

## Development Workflow

After any code change:
1. Deploy changes immediately
2. Confirm deployment successful
3. Re-test functionality
4. Proceed only after verifying stability

Debug cycle: `Debug -> Fix -> Deploy -> Confirm resolution`

## Validation Requirements

| Aspect | Details |
|--------|---------|
| Source | All User Stories in `spec.md` |
| Coverage | Functional correctness, data consistency, state transitions, error handling |

Validation workflow:
1. Test feature end-to-end
2. If issues found: debug, implement fixes, deploy
3. Re-validate
4. Repeat until feature is fully functional
5. Move to next feature

Page requirements:
- All functions fully implemented and data-driven (no hardcoded placeholders)
- All routes accessible via UI
- Document new components with behavior and state details
- Map UI elements to corresponding User Stories

## Specifications Compliance

**`spec.md` is the authoritative source** - all items must be completed.

If specifications are unclear, refine them to be explicit, structured, consistent, and agent-friendly while preserving original intent.

## Execution Priorities

1. Complete **everything** in `spec.md` - no exceptions
2. Validate each feature thoroughly
3. Debug and fix all issues immediately
4. Deploy after each update
5. **Do not stop** until all User Stories are done

## Completion Criteria

Work is **not complete** until:
- Every User Story in `spec.md` is implemented
- Every feature passes validation
- Every bug is debugged and fixed
- The entire application works end-to-end

**DO NOT STOP EARLY. WORK CONTINUOUSLY UNTIL COMPLETE.**
