## Project install
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
- Additional Frontend API (class components + mobx): https://github.com/prot-alx/finnplay_test_task_2

## Compile and run the project

### development
```bash
npm run start
```

### watch mode
```bash
npm run start:dev
```

### production mode
```bash
npm run start:prod
```

## Using Docker Compose
### Start the application
```bash
docker compose up -d
```
### View logs
```bash
docker compose logs -f
```

### Stop the application
```bash
docker compose down
```

## Swagger
### The API documentation is available at the following URL:
- **Local:** [`http://localhost:3000/api`](http://localhost:3000/api)
- **Production:** `<your_server_address>/api`


### Mock user 1:
```plaintext
login: player1
password: player1
```

### Mock user 2:
```plaintext
login: player2
password: player2
```
