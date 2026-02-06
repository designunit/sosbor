# Sosbor

Sosbor is a civic engagement platform for collecting citizen feedback on city master plans. Users can submit location-based ideas via an interactive map and complete surveys about urban development.

## Tech Stack

- **Frontend** — Next.js 16, React 19, TypeScript, Mantine UI 7, Mapbox GL / MapLibre GL
- **Backend** — PocketBase
- **Infrastructure** — Docker Compose, GHCR, Watchtower

## Repository Structure

```
frontend/       Next.js application
pb/             PocketBase backend with migrations
compose.yml     Production Docker Compose
compose-dev.yml Development Docker Compose (Payload CMS + MongoDB)
mise.toml       Task runner config
```

## Getting Started

### Prerequisites

- Node.js 24
- [mise](https://mise.jdx.dev/) (optional, for Docker-based dev tasks)

### Frontend

```sh
cd frontend
cp .env.example .env   # configure environment variables
npm install
npm run dev            # start dev server
```

### Environment Variables

| Variable                           | Description             |
| ---------------------------------- | ----------------------- |
| `BACKEND_URL`                      | Backend API base URL    |
| `NEXT_PUBLIC_MAPLIBRE_STYLE`       | MapLibre style JSON URL |
| `NEXT_PUBLIC_MAPBOX_STYLE`         | Mapbox style URL        |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`  | Mapbox API token        |

### Dev Backend (Docker)

Start the development backend with Payload CMS and MongoDB:

```sh
mise run dev     # start containers
mise run stop    # stop containers and remove volumes
```

## Available Scripts

Run from `frontend/`:

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start Next.js dev server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Production Deployment

1. Log in to GHCR:
   ```sh
   echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
   ```

2. Run services with Docker Compose:
   ```sh
   docker compose up -d
   ```

3. Set up Watchtower for automatic image updates:
   ```sh
   docker run -d --restart always --name watchtower \
     -v $HOME/.docker/config.json:/config.json \
     -v /var/run/docker.sock:/var/run/docker.sock \
     containrrr/watchtower --debug --interval 10
   ```
