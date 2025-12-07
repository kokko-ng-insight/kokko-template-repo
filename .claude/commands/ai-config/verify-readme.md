# Verify README.md Accuracy

Audit README.md to ensure it accurately reflects the current state of the codebase and provides working instructions.

## Step 1: Read Current README.md

Read and understand all content in README.md.

## Step 2: Verify Each Section Against Reality

For each section in README.md:

1. **Project Description** - Does it accurately describe what the code actually does?
2. **Prerequisites** - Are version requirements correct?
   ```bash
   node --version 2>/dev/null
   python --version 2>/dev/null
   go version 2>/dev/null
   ```
3. **Installation Commands** - Execute each installation step and verify it works
4. **Run/Start Commands** - Verify the main execution command works
5. **Configuration** - Check that documented config files and environment variables exist
6. **File Paths** - Verify all referenced directories and files exist

## Step 3: Test All Code Examples

For every code block in README.md:

1. Copy the exact command or code
2. Execute it in the project root
3. Verify it produces the documented result
4. Note any errors or unexpected output

```bash
# Example: test documented npm commands
npm install
npm run build
npm test
```

## Step 4: Check for Missing Essentials

Identify critical information not in README.md:

1. **Environment Variables** - Are required env vars documented?
   ```bash
   grep -r "process.env\|os.environ\|os.Getenv" --include="*.js" --include="*.ts" --include="*.py" --include="*.go" . 2>/dev/null | head -20
   ```
2. **Dependencies** - Are system dependencies (databases, services) mentioned?
3. **Port Numbers** - Are default ports documented?
4. **Common Errors** - Are known setup issues addressed?

## Step 5: Check for Outdated Information

Look for:
- References to removed files or deprecated features
- Old version numbers or requirements
- Broken links (both internal and external)
- Commands that fail or have changed
- Screenshots that no longer match the UI

```bash
# Check for broken internal links
grep -oE '\[.*\]\((\.?/[^)]+)\)' README.md | grep -oE '\(.*\)' | tr -d '()' | while read path; do
  [ ! -e "$path" ] && echo "Broken: $path"
done
```

## Step 6: Verify Links

Test all URLs in README.md:
- Documentation links
- External resources
- Badge URLs
- Repository links

## Step 7: Update README.md

Fix any inaccuracies found:
- Correct broken commands
- Update version requirements
- Remove references to deleted files
- Add missing critical setup steps
- Fix broken links

## Step 8: Validate Changes

After updates, perform a clean test:
1. Clone to a fresh directory (or delete node_modules, venv, etc.)
2. Follow README.md instructions exactly
3. Verify the project runs successfully
4. Document any additional steps needed
