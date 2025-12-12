# C4 Architecture Mapping

Map the codebase architecture using the C4 model (Context, Container, Component, Code).

## Instructions

Use the Task tool to spawn 4 parallel Explore subagents in a single message. Each subagent analyzes one C4 level.

### Subagent Invocations

Invoke all 4 subagents in parallel using the Task tool:

**Subagent 1: System Context**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Map C4 system context"
  prompt: |
    TASK: Map the SYSTEM CONTEXT level (C4 Level 1) of this codebase.

    EXPLORATION GOALS:
    1. Identify the system boundary - determine what this software system is and does
    2. Find all users/actors by searching for:
       - Authentication/authorization code
       - User role definitions
       - API consumers
    3. Map external systems by searching for:
       - HTTP client configurations (requests, httpx, axios, fetch)
       - SDK imports (azure, aws, stripe, twilio, etc.)
       - Environment variables referencing external URLs/keys
       - Database connection strings for external DBs
    4. Document data flows in and out of the system

    SEARCH STRATEGY:
    - Glob for config files: **/*.env*, **/config.*, **/settings.*
    - Grep for HTTP clients: "requests\.", "httpx\.", "axios", "fetch("
    - Grep for SDK patterns: "import.*azure", "import.*aws", "from stripe"
    - Check docker-compose.yml for external service dependencies

    OUTPUT FORMAT:
    Return a C4-PlantUML Context diagram:
    ```plantuml
    @startuml
    !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

    title System Context diagram for [System Name]

    Person(user, "User", "Description")
    System(system, "System Name", "Description")
    System_Ext(ext, "External System", "Description")

    Rel(user, system, "Uses")
    Rel(system, ext, "Calls")
    @enduml
    ```

    Also return:
    - List of external integrations found with file paths
    - List of user types/actors identified
```

**Subagent 2: Container Level**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Map C4 containers"
  prompt: |
    TASK: Map the CONTAINER level (C4 Level 2) of this codebase.

    EXPLORATION GOALS:
    1. Identify all deployable units:
       - Frontend applications (web, mobile)
       - Backend services/APIs
       - Background workers/jobs
       - Databases (type and purpose)
       - Message queues
       - Cache layers
    2. Document technology stack per container
    3. Map inter-container communication patterns
    4. Identify entry points and protocols

    SEARCH STRATEGY:
    - Glob for package manifests: **/package.json, **/requirements.txt, **/pyproject.toml, **/go.mod
    - Glob for deployment configs: **/Dockerfile, **/docker-compose.yml, **/k8s/**
    - Find main entry points: main.py, app.py, index.ts, server.ts
    - Grep for server setup: "FastAPI", "Express", "Flask", "createServer"
    - Grep for queue consumers: "celery", "bull", "rabbitmq", "kafka"

    OUTPUT FORMAT:
    Return a C4-PlantUML Container diagram:
    ```plantuml
    @startuml
    !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

    title Container diagram for [System Name]

    Container(web, "Web App", "React", "User interface")
    Container(api, "API", "Node.js", "Business logic")
    ContainerDb(db, "Database", "PostgreSQL", "Data storage")

    Rel(web, api, "REST/JSON")
    Rel(api, db, "SQL")
    @enduml
    ```

    Also return:
    - Technology stack summary table
    - Key configuration files found with paths
    - Inter-container communication protocols
```

**Subagent 3: Component Level**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Map C4 components"
  prompt: |
    TASK: Map the COMPONENT level (C4 Level 3) of this codebase.

    EXPLORATION GOALS:
    For each container, analyze:
    1. Major modules/packages (top-level directories)
    2. Component responsibilities (one sentence each)
    3. Internal dependencies between components
    4. Key interfaces/contracts between components
    5. Shared utilities and their consumers

    SEARCH STRATEGY:
    - List top-level directories under src/ or equivalent
    - Read __init__.py or index.ts files for module exports
    - Grep for import patterns to map dependencies
    - Find interface/protocol definitions
    - Identify shared utility modules

    OUTPUT FORMAT:
    Return C4-PlantUML Component diagrams (one per container):
    ```plantuml
    @startuml
    !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

    title Component diagram for [Container Name]

    Component(auth, "Auth Module", "Handles authentication")
    Component(users, "Users Module", "User management")
    Component(api, "API Layer", "Route handlers")

    Rel(api, auth, "Uses")
    Rel(api, users, "Uses")
    @enduml
    ```

    Also return:
    - Module dependency matrix
    - Interface files found with paths
    - Shared utility consumers list
```

**Subagent 4: Code Level**
```
Tool: Task
Parameters:
  subagent_type: "Explore"
  description: "Map C4 code structure"
  prompt: |
    TASK: Map the CODE level (C4 Level 4) of this codebase.

    EXPLORATION GOALS:
    For key components, analyze:
    1. Key classes/modules and their purposes
    2. Design patterns in use (Repository, Factory, Observer, etc.)
    3. Class relationships and hierarchies
    4. Critical code paths (request handling, data processing)
    5. Shared base classes or interfaces

    SEARCH STRATEGY:
    - Grep for class definitions: "class \w+", "interface \w+"
    - Find base classes: "class.*ABC", "class.*Base", "extends"
    - Identify patterns: "Repository", "Factory", "Service", "Handler"
    - Trace request flow from routes to data layer
    - Find abstract methods and implementations

    OUTPUT FORMAT:
    Return PlantUML class diagrams for key components:
    ```plantuml
    @startuml
    class UserService {
      +getUser(id)
      +createUser(data)
    }
    class UserRepository {
      +findById(id)
      +save(user)
    }
    UserService --> UserRepository
    @enduml
    ```

    Also return:
    - List of key classes with file paths
    - Design patterns identified with locations
    - Class hierarchy summary
```

## After All Subagents Complete

Create the `codemap/` folder structure organized by C4 level and write PlantUML diagrams to separate .puml files.

### Step 1: Create folder structure
```bash
mkdir -p codemap/level1-context codemap/level2-containers codemap/level3-components codemap/level4-code
```

### Step 2: Write PlantUML files

Extract the PlantUML diagram code from each subagent and write to .puml files in the appropriate level folder:

**Level 1 - System Context:**
- `codemap/level1-context/context.puml` - Write the @startuml...@enduml block from Subagent 1

**Level 2 - Containers:**
- `codemap/level2-containers/containers.puml` - Write the @startuml...@enduml block from Subagent 2

**Level 3 - Components:**
- `codemap/level3-components/components-api.puml` - Write API component diagram from Subagent 3
- `codemap/level3-components/components-services.puml` - Write services component diagram from Subagent 3
- `codemap/level3-components/components-data.puml` - Write data layer component diagram from Subagent 3
- `codemap/level3-components/components-infrastructure.puml` - Write infrastructure component diagram from Subagent 3
- `codemap/level3-components/components-external.puml` - Write external clients component diagram from Subagent 3

**Level 4 - Code:**
- `codemap/level4-code/code-*.puml` - Write class diagrams from Subagent 4 (one per major component)

### Step 3: Generate PNG exports

Generate PNG images from all PlantUML files using the PlantUML CLI:

```bash
# Generate PNGs for all levels (outputs to same directory as .puml files)
plantuml -tpng codemap/level1-context/*.puml
plantuml -tpng codemap/level2-containers/*.puml
plantuml -tpng codemap/level3-components/*.puml
plantuml -tpng codemap/level4-code/*.puml
```

If PlantUML CLI is not available, note this in the output and provide instructions:
- Install via: `brew install plantuml` (macOS) or `apt install plantuml` (Linux)
- Or use VS Code PlantUML extension to export PNGs manually
- Or use online renderer: https://www.plantuml.com/plantuml/uml/

### Step 4: Write markdown documentation files

**codemap/README.md**
```markdown
# C4 Architecture Map

<!-- Last updated: YYYY-MM-DD -->

Overview of [Project Name] architecture using the C4 model.

## Folder Structure

```
codemap/
├── README.md
├── level1-context/
│   ├── context.puml
│   ├── context.png
│   └── context.md
├── level2-containers/
│   ├── containers.puml
│   ├── containers.png
│   └── containers.md
├── level3-components/
│   ├── components-*.puml
│   ├── components-*.png
│   └── components.md
└── level4-code/
    ├── code-*.puml
    ├── code-*.png
    └── code.md
```

## Contents

| Level | Scope | Documentation | Diagram | Image |
|-------|-------|---------------|---------|-------|
| 1 | System Context | [context.md](./level1-context/context.md) | [context.puml](./level1-context/context.puml) | [context.png](./level1-context/context.png) |
| 2 | Containers | [containers.md](./level2-containers/containers.md) | [containers.puml](./level2-containers/containers.puml) | [containers.png](./level2-containers/containers.png) |
| 3 | Components | [components.md](./level3-components/components.md) | level3-components/*.puml | level3-components/*.png |
| 4 | Code | [code.md](./level4-code/code.md) | level4-code/*.puml | level4-code/*.png |

## Technology Stack
[Summary from Subagent 2]

## Key Files
[Combined file path list from all subagents]

## Rendering Diagrams

PlantUML diagrams can be rendered using:
- VS Code PlantUML extension
- Online: https://www.plantuml.com/plantuml/uml/
- CLI: `plantuml -tpng codemap/**/*.puml`

## Regenerating PNG Exports

```bash
plantuml -tpng codemap/level1-context/*.puml
plantuml -tpng codemap/level2-containers/*.puml
plantuml -tpng codemap/level3-components/*.puml
plantuml -tpng codemap/level4-code/*.puml
```
```

**codemap/level1-context/context.md**
```markdown
# Level 1: System Context

<!-- Last updated: YYYY-MM-DD -->

[Subagent 1 output: description]

## Diagram

![System Context](./context.png)

Source: [context.puml](./context.puml)

## External Systems

| System | Type | Integration Point |
|--------|------|-------------------|
| ... | ... | ... |

## Data Flows

[Description of data entering/leaving the system]
```

**codemap/level2-containers/containers.md**
```markdown
# Level 2: Containers

<!-- Last updated: YYYY-MM-DD -->

[Subagent 2 output: description]

## Diagram

![Containers](./containers.png)

Source: [containers.puml](./containers.puml)

## Container Details

| Container | Technology | Purpose |
|-----------|------------|---------|
| ... | ... | ... |

## Communication

[Inter-container protocols and patterns]
```

**codemap/level3-components/components.md**
```markdown
# Level 3: Components

<!-- Last updated: YYYY-MM-DD -->

[Subagent 3 output: description]

## Diagrams

Component diagrams are split by area:

### API Layer
![API Components](./components-api.png)
Source: [components-api.puml](./components-api.puml)

### Services Layer
![Services Components](./components-services.png)
Source: [components-services.puml](./components-services.puml)

### Data Layer
![Data Components](./components-data.png)
Source: [components-data.puml](./components-data.puml)

### Infrastructure
![Infrastructure Components](./components-infrastructure.png)
Source: [components-infrastructure.puml](./components-infrastructure.puml)

### External Clients
![External Components](./components-external.png)
Source: [components-external.puml](./components-external.puml)

## Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| ... | ... |

## Dependencies

[Internal dependency map]
```

**codemap/level4-code/code.md**
```markdown
# Level 4: Code

<!-- Last updated: YYYY-MM-DD -->

[Subagent 4 output: description]

## Class Diagrams

Class diagrams are split by component area. See code-*.puml and code-*.png files in this folder.

## Design Patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| ... | ... | ... |

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| ... | ... | ... |
```

### Step 5: Confirm output

After writing all files, list the codemap folder structure:
```bash
find codemap -type f | sort
```

Output confirmation message with:
- File locations organized by level
- Instructions for rendering diagrams
- Note if PNG generation succeeded or needs manual action
