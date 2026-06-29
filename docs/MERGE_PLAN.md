# Merge Plan

## Current Decision

This branch keeps only the current backend implementation and moves it under `backend/`. The current working tree does not contain Next.js source files, so `frontend/` is intentionally kept as a placeholder for a later merge from the `frontend` branch.

## Expected Conflict Areas

- `.gitignore`: both backend and frontend branches define ignored build artifacts.
- `README.md`: this branch creates a monorepo README while the frontend branch already has a product/project README.
- `docs/`: both branches may add planning and analysis documents.
- `test.txt`: this branch moves it to `docs/test.txt`; the frontend branch also has `docs/test.txt`.

## Frontend Merge Checklist

- Keep frontend source files inside `frontend/`.
- Run `npm install`, `npm run build`, and `npm run lint` from `frontend/`.
- Preserve backend files under `backend/` when resolving delete/add conflicts.
- Keep root-level files limited to repository coordination files such as `README.md`, `.gitignore`, and `docs/`.
