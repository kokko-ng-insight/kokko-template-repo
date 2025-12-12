Generate a focused daily summary of what changed TODAY in the Azure subscription.

1. **Check Azure login status**: Run `az account show` to verify authentication and display subscription name/ID

2. **Get today's activity log**: Query activity log for today's date only (start-time = today 00:00:00 UTC)
   - Group events by resource group
   - Show operation names, status, and timestamps
   - Highlight any failed operations

3. **Summarize what happened today**:
   - List all operations performed (creates, updates, deletes)
   - Show which resources were modified
   - Identify who/what initiated the changes (caller)
   - Note any deployments that ran today

4. **Check for issues**:
   - List any failed operations with error details
   - Flag any resources in transitional states (Deleting, Creating, etc.)

5. **Format output** as a concise daily changelog:
   - Quick summary: "X events, Y succeeded, Z failed"
   - Timeline of significant operations
   - Resources affected
   - Any items requiring attention

Do NOT list all resources or services. Only show what actually changed or had activity today. If nothing happened, say "No activity recorded today."
