# Performance Bottleneck Analysis

Perform deep analysis to identify performance bottlenecks across the codebase.

## 1. Database and Query Performance

**Search for:**
- N+1 query patterns (loops containing database queries)
- Missing indexes on frequently queried columns
- SELECT * queries instead of specific columns
- Lack of query result caching
- Missing pagination on large result sets
- Synchronous database calls in loops
- Missing connection pooling configuration

**Check:** ORM models, database queries, migration files

## 2. API and Network Performance

**Search for:**
- Sequential API calls that could be parallelized
- Missing request/response caching
- Large payloads without compression
- Synchronous external API calls blocking request handlers
- Missing timeout configurations
- Repeated API calls for same data
- No rate limiting or circuit breakers

**Check:** API routes, HTTP clients, service layers

## 3. Frontend Performance

**Search for:**
- Large inline scripts/data in HTML templates
- Missing lazy loading for images/components
- Excessive DOM manipulation in loops
- No debouncing/throttling on frequent events
- Large reactive data objects causing overhead
- Missing code splitting or bundling
- Synchronous operations blocking UI rendering
- Unnecessary re-renders or watchers

**Check:** Templates, JavaScript files, event handlers

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

**Check:** Service classes, background jobs, data processing logic

## 5. Memory and Resource Management

**Search for:**
- Memory leaks (unclosed connections, unreleased resources)
- Large objects kept in memory unnecessarily
- Missing context managers for file/connection handling
- Unbounded collections or caches
- Circular references preventing garbage collection
- Missing resource pooling
- Large log statements in hot paths

**Check:** Service classes, connection handling, cache implementations

## 6. Concurrency and Parallelization

**Search for:**
- Sequential operations that could run in parallel
- Missing async patterns for I/O-bound operations
- Thread-safety issues in shared resources
- Lock contention or deadlock risks
- Missing use of concurrent.futures or asyncio
- Synchronous code in async contexts

**Check:** Batch operations, workflow orchestration, concurrent handlers

## Analysis Approach

1. **Prioritize hot paths:**
   - User-facing request handlers
   - Background job processing
   - Database query-heavy operations
   - External API integrations

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

Focus on issues with the most significant impact on user experience and system scalability.
