# Prompt: Generate, Commit, and Push with Git

## Instructions

1. **Write a concise and descriptive git commit message**  
    - Summarize the changes made.
    - Use the imperative mood (e.g., "Add feature", "Fix bug", "Update docs").
    - Keep the first line under 72 characters.

2. **Commit your changes**  
    ```sh
    git add .
    git commit -m "<your commit message>"
    ```

3. **Push your commit to the remote repository**  
    ```sh
    git push
    ```

## Example

1. **Commit message:**  
    ```
    Add user authentication to login endpoint
    ```

2. **Commands:**  
    ```sh
    git add .
    git commit -m "Add user authentication to login endpoint"
    git push
    ```