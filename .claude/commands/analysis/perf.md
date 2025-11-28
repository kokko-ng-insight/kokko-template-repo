Perform deep analysis to identify performance bottlenecks across the codebase:

## 1. Database & Query Performance

**Search for:**
- N+1 query patterns (loops containing database queries)
- Missing indexes on frequently queried columns
- SELECT * queries instead of specific columns
- Lack of query result caching
- Missing pagination on large result sets
- Synchronous database calls in loops
- Missing connection pooling configuration

**Check files:**
- `backend/ingenious_extensions/services/`
- `frontend/app/services/`
- Any SQLAlchemy models and queries
- Database migration files for index definitions

## 2. API & Network Performance

**Search for:**
- Sequential API calls that could be parallelized
- Missing request/response caching
- Large payloads without compression
- Synchronous external API calls blocking request handlers
- Missing timeout configurations
- Repeated API calls for same data
- No rate limiting or circuit breakers

**Check files:**
- `frontend/app/services/ingenious_client.py`
- `backend/ingenious_extensions/api/routes/`
- Azure Functions HTTP trigger handlers
- Web search service implementations

## 3. Frontend Performance

**Search for:**
- Large inline scripts/data in HTML templates
- Missing lazy loading for images/components
- Excessive DOM manipulation in loops
- No debouncing/throttling on frequent events
- Large Alpine.js data objects causing reactivity overhead
- Missing code splitting or bundling
- Synchronous operations blocking UI rendering
- Unnecessary re-renders or watchers

**Check files:**
- `frontend/app/templates/`
- `frontend/static/js/`
- JavaScript event handlers
- Alpine.js x-data and x-init directives

## 4. Backend Processing Performance

**Search for:**
- Synchronous processing of large datasets
- Missing async/await patterns
- Blocking I/O operations
- Inefficient loops (nested loops, repeated operations)
- Large file operations without streaming
- Missing worker queues for background tasks
- Heavy computation in request handlers
- No caching of expensive operations

**Check files:**
- `backend/ingenious_extensions/services/chat_services/`
- `functions/shared/blob_loader.py`
- Agent workflow implementations
- Token counting and truncation logic

## 5. Memory & Resource Management

**Search for:**
- Memory leaks (unclosed connections, unreleased resources)
- Large objects kept in memory unnecessarily
- Missing context managers for file/connection handling
- Unbounded collections or caches
- Circular references preventing garbage collection
- Missing resource pooling
- Large log statements in hot paths

**Check files:**
- Service classes with persistent state
- Database connection handling
- File I/O operations
- Cache implementations

## 6. Concurrency & Parallelization

**Search for:**
- Sequential operations that could run in parallel
- Missing async patterns for I/O-bound operations
- Thread-safety issues in shared resources
- Lock contention or deadlock risks
- Missing use of concurrent.futures or asyncio
- Synchronous code in async contexts
- GIL-bound operations in Python

**Check files:**
- Multi-agent workflow orchestration
- Batch processing operations
- Azure Functions concurrent execution

## Analysis Approach

1. **Prioritize hot paths:**
   - User-facing request handlers
   - Azure Functions triggers (BlobCreatedTrigger, RegenerateTrigger)
   - Multi-agent workflow execution
   - Database query-heavy operations

2. **Measure before optimizing:**
   - Check for existing performance metrics/logging
   - Identify actual bottlenecks vs perceived issues
   - Look for TODO comments mentioning performance

3. **Provide actionable recommendations:**
   - Specific code locations with line numbers
   - Concrete optimization suggestions
   - Estimated impact (high/medium/low)
   - Implementation complexity assessment

4. **Consider trade-offs:**
   - Code complexity vs performance gain
   - Memory usage vs speed
   - Caching benefits vs stale data risks

Focus on issues that would have the most significant impact on user experience and system scalability.
