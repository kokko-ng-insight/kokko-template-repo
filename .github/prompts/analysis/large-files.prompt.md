Identify and split large files across the codebase:

1. **Identify candidates** (any of these criteria):
   - Files >500 lines
   - Files with >5 distinct classes/functions handling different concerns
   - Files with multiple unrelated responsibilities
   - Files that violate Single Responsibility Principle

2. **Split strategy**:
   - Separate by domain/functionality (models, services, utils, validators)
   - Group related classes/functions into cohesive modules
   - Extract common utilities to shared modules
   - Create feature-based or component-based organization where appropriate

3. **File organization**:
   - Create logical module structure with clear naming conventions
   - Update imports across codebase
   - Maintain backward compatibility with existing imports where possible
   - Add module index files (e.g., `__init__.py`, `index.ts`) for clean public APIs

4. **Quality checks**:
   - Ensure tests still pass after refactoring
   - Verify no circular dependency issues
   - Check that each new file has clear, single purpose
   - Update documentation/comments as needed
   - Run linters and formatters to maintain code style

Prioritize files causing the most maintenance friction or merge conflicts.
