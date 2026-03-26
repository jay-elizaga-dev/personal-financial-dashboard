# Project Structure: Personal Finance Dashboard

## What is this?

A comprehensive financial tracking dashboard that aggregates bank accounts via Plaid API and cryptocurrency holdings via Coinbase. Built with Next.js, it provides real-time balance tracking, historical records, and optional daily email summaries. Uses Prisma ORM for data persistence and NextAuth for authentication.

## Key Facts

| Fact | Value |
|------|-------|
| Type | Full-stack web application |
| Language | TypeScript / JavaScript |
| Framework | Next.js 15.4.2 (App Router) |
| Frontend | React 18.3 + TailwindCSS + shadcn-ui |
| Database | SQLite (Prisma ORM) |
| Authentication | NextAuth.js |
| Deployment | Podman (containerized) |
| Package manager | npm |
| Test runner | None configured |
| Node version | 18+ (specified in .nvmrc) |

## Directory Map

```
dashboard/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable React components
│   └── lib/              # Utility functions, configurations, API clients
├── prisma/               # Database schema and migrations
├── scripts/              # Automation scripts (refresh data, send emails)
├── public/               # Static assets (icons, images)
├── memory-bank/          # Project notes and context
├── .cursor/              # Cursor IDE configuration
├── Containerfile         # Podman/Docker container build definition
├── podman-compose.yml    # Multi-container orchestration config
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── .env.example          # Environment variables template
```

## Entry Points

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main dashboard landing page |
| `src/app/api/` | API route handlers (Plaid, Coinbase, auth) |
| `prisma/schema.prisma` | Database schema definition |
| `next.config.ts` | Next.js build and runtime config |

## Scope Boundaries

**Safe to modify:**
- `src/` - Application code (components, pages, utilities)
- `prisma/schema.prisma` - Database schema (with migration)
- `styles/` - Tailwind and CSS customization
- `.env` files - Environment configuration

**Be careful:**
- `public/` - Static files (ensure proper caching headers)
- `scripts/` - Automation scripts (test thoroughly before deploy)

**Off-limits / Don't modify:**
- `.git/` - Version control system
- `node_modules/` - Package cache
- `package-lock.json` - Lock file (auto-managed)

## Configuration

| File | What it configures | Gitignored? |
|------|-------------------|-------------|
| `.env` | Plaid, Coinbase, NextAuth, email secrets | Yes |
| `.env.docker` | Template for containerized deployment | No |
| `.env.example` | Public template for setup | No |
| `next.config.ts` | Next.js build behavior | No |
| `tsconfig.json` | TypeScript compiler | No |
| `tailwind.config.ts` | TailwindCSS theme | No |
| `Containerfile` | Podman/Docker multi-stage build | No |
| `podman-compose.yml` | Container orchestration and resource limits | No |
| `prisma/schema.prisma` | Database schema and relations | No |

## Services & Ports

| Service | Port | Health check | Notes |
|---------|------|-------------|-------|
| Next.js App | 4173 | `curl http://localhost:4173` | Main web interface |
| Prisma Studio | 5555 | `curl http://localhost:5555` | Database viewer (dev only) |
| Plaid API | External | - | Bank connection service |
| Coinbase API | External | - | Cryptocurrency integration |

## Key Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npx prisma db push` | Apply schema changes to database |
| `npx prisma studio` | Open database management UI |
| `npm run test-email` | Send test email notification |
| `podman build -t dashboard .` | Build container image |
| `podman-compose up -d` | Run containers in background |
| `podman-compose logs -f` | Stream container logs |
| `podman-compose down` | Stop and remove containers |

## Architecture Notes

The app follows Next.js App Router patterns with API routes handling external integrations (Plaid for banks, Coinbase for crypto). Data flows: User connects bank/crypto → API route fetches from external service → Prisma stores in SQLite → Frontend queries via React Query. NextAuth provides authentication layer. Containerization via Podman allows easy deployment with resource constraints (2 CPU, 2GB RAM).

## Dependencies Worth Knowing

| Dependency | Why it matters |
|-----------|---------------|
| `@prisma/client` | ORM for SQLite queries and migrations |
| `@tanstack/react-query` | Client-side data fetching and caching |
| `react-plaid-link` | Plaid OAuth flow for secure bank linking |
| `chart.js` + `react-chartjs-2` | Financial charts and visualizations |
| `nodemailer` | Email sending for daily summaries |
| `next-auth` | Session management and authentication |
| `shadcn-ui` | Component library (dialog, slot utilities) |
| `csv-parse` | Data import from CSV files |

## Cross-References

| Doc | When to read |
|-----|-------------|
| [README.md](../README.md) | Full setup instructions and troubleshooting |
| [.env.example](../.env.example) | Environment variable reference |
| [Containerfile](../Containerfile) | Container build instructions |
| [podman-compose.yml](../podman-compose.yml) | Container orchestration config |
| [prisma/schema.prisma](../prisma/schema.prisma) | Complete database schema |

## Running in Production (Podman)

```bash
# Build the container image
podman build -t personal-dashboard:latest .

# Create .env file from template
cp .env.docker .env
# Edit .env with your Plaid, Coinbase, and NextAuth secrets

# Run with podman-compose
podman-compose up -d

# View logs
podman-compose logs -f dashboard

# Stop containers
podman-compose down
```

<!-- Generated: 2026-03-26 -->
