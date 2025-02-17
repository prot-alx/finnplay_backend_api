## Project install =
```bash
git clone https://github.com/prot-alx/finnplay_backend_api
```

## Project setup

```bash
npm install
```

## Default Configuration
- Frontend runs on:
  - Development mode: localhost:5173
  - Production mode: localhost:4173
- Frontend API repository: https://github.com/prot-alx/finnplay_react_api
- Backend API: localhost:3000
- CORS is enabled for localhost:5173 and localhost:4173 by default

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Using Docker Compose

```bash
# Start the application
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down
```

The API runs on port 3000 by default.