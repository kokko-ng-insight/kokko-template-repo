Create or improve Dockerfile and .dockerignore for this project, then build and test locally to ensure it works properly.

If Dockerfile and .dockerignore don't exist:
1. Analyze the project structure and dependencies to determine the application type (Flask, FastAPI, etc.)
2. Create an optimized Dockerfile using appropriate base image and multi-stage builds if beneficial
3. For Flask apps: use gunicorn as the WSGI server
4. For FastAPI apps: use uvicorn as the ASGI server
5. Create a comprehensive .dockerignore file to exclude unnecessary files
6. Ensure proper health checks and security best practices

If Dockerfile and .dockerignore already exist:
1. Review and optimize existing files if needed
2. Proceed to testing phase

Testing phase (always run these steps):
1. Run `colima start` to ensure Docker daemon is running on macOS
2. Build the Docker image without BuildKit: `DOCKER_BUILDKIT=0 docker build -t app-test .`
3. Run the container with appropriate port mapping: `docker run -p 8000:8000 app-test` (adjust port as needed)
4. Test that the application starts successfully and serves requests
5. Verify all endpoints are accessible and working as expected
6. Stop and clean up test containers
7. If issues are found, debug iteratively by updating Dockerfile/dockerignore and rebuilding until everything works

Focus on creating a production-ready, secure, and efficient containerized application.