# Baeum Passport

This repository is organized as a monorepo with separate frontend and backend workspaces.

## Structure

```text
baeum_passport/
├── frontend/   # Next.js app; source will be merged from the frontend branch
├── backend/    # Spring Boot API
├── docs/       # analysis and merge planning documents
├── README.md
└── .gitignore
```

## Backend

```powershell
cd backend
.\gradlew.bat build
```

The backend runs on port `4000` by default. Database connection values are configured in `backend/src/main/resources/application.properties`.

## Frontend

The current working tree does not include the Next.js source files. After merging the `frontend` branch, run frontend commands from the `frontend/` directory:

```powershell
cd frontend
npm install
npm run build
npm run lint
```
