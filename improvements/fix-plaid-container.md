# Fix Plaid + Container Issues

## Goal
Get the personal finance dashboard fully working in its podman container with Plaid Link functional.

## Context
- Branch: `add/plaid-solo-auth`
- Plaid production requires HTTPS for redirect URIs, which blocks local OAuth
- Stale build cache has been a recurring issue — always use `--no-cache`
- Database tables must be created at startup via `prisma db push`

## Testing Credentials
Use **sandbox** mode for all testing:
- `PLAID_ENV=sandbox`
- `PLAID_SECRET=2ce30fcd7d7a625ce6459f5c9ce64d`
- `PLAID_REDIRECT_URI=` (leave empty — sandbox doesn't need it)

## Tasks

### 1. Configure sandbox testing environment
- Create a `.env.test` or update `.env` in the worktree with sandbox credentials above
- Keep `PLAID_CLIENT_ID` from existing `.env` (or use the one in `.env.example`)
- Set `PLAID_ENV=sandbox`

### 2. Build and verify container (use --no-cache)
- `podman-compose down`
- `podman rmi dashboard_dashboard` (delete old image to avoid stale cache)
- `podman-compose build --no-cache`
- `podman-compose up -d`
- Verify in logs that `prisma db push` ran and created tables

### 3. Verify all routes return correct responses
- `GET /` → 200 with dashboard HTML
- `GET /transactions` → 200
- `GET /accounts` → 200
- `GET /api/accounts` → 200 with `[]` or valid JSON (NOT P2021 table-not-found)
- `GET /api/plaid/create-link-token` → 200 with `link_token` in response (sandbox should work without redirect URI)

### 4. Verify database persistence
- `DATABASE_URL` inside container should be `file:./data/dev.db`
- The volume `dashboard-data:/app/data` should persist the SQLite file

### 5. Verify no auth errors
- No `UntrustedHost` errors in logs (`AUTH_TRUST_HOST=true` should prevent this)
- Auth is disabled by default (`ENABLE_AUTH` not set) — dashboard loads without login

### 6. Test Plaid Link flow end-to-end (sandbox)
- Open dashboard in browser at mapped port
- Click "Connect Bank" — button should be enabled (link token created)
- In sandbox: select any institution, use test credentials (user_good / pass_good)
- Verify token exchange succeeds and accounts appear in dashboard

### 7. Fix any issues found
- If any step fails, diagnose root cause and fix
- Commit fixes to `add/plaid-solo-auth` branch
- Write results to `.reports/`

## Success Criteria
- Container starts clean, tables created, all routes 200
- Plaid Link works in sandbox mode end-to-end
- Accounts persist in SQLite on the volume
