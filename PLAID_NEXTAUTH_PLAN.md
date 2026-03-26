# Plaid + NextAuth Solo Integration — Implementation Plan

## Status
**In Progress** — Auth scaffold complete, middleware redirect needs fix

**Branch**: `add/plaid-solo-auth`

---

## What's Done ✅

### NextAuth Infrastructure
- [x] Created `src/auth.ts` with Credentials provider (password-based auth)
- [x] API route: `src/app/api/auth/[...nextauth]/route.ts`
- [x] Login page: `src/app/login/page.tsx` (clean UI, password form)
- [x] SessionProvider added to `src/app/providers.tsx`
- [x] Environment config: `NEXTAUTH_SECRET` + `DASHBOARD_PASSWORD` in `.env`
- [x] Podman container config updated for auth env vars

### Components Created
- [x] `src/components/SidebarNav.tsx` — sidebar with Sign Out button
- [x] `src/components/Header.tsx` — header with Sign Out (optional)
- [x] `src/components/ProtectedRoute.tsx` — client-side auth wrapper

### Testing
- [x] Built + deployed to podman container (localhost:4173)
- [x] App compiles without errors
- [x] Login page accessible

---

## What Needs to Be Done ❌

### 1. Fix Route Protection (HIGH PRIORITY)
**Problem**: Middleware isn't redirecting unauthenticated requests to `/login`
- Current: Users see dashboard even without auth
- Expected: Unauthenticated → redirect to `/login`

**Options to fix**:
- **Option A** (Recommended): Use client-side auth check via `LayoutContent` component
  - Wrap protected routes with session check
  - Redirect to login client-side before rendering protected content
  - More reliable with NextAuth v5 beta

- **Option B**: Debug middleware configuration
  - Verify middleware is being triggered
  - Check auth() function behavior in v5 beta
  - May need to adjust matcher or auth configuration

### 2. Test Login Flow
- [ ] Access `/login` without session → should show login form
- [ ] Enter `DASHBOARD_PASSWORD` value
- [ ] Verify login succeeds and redirects to `/`
- [ ] Verify session cookie is set
- [ ] Verify logout clears session

### 3. Protect API Routes
- [ ] All `/api/*` routes should check for valid session
- [ ] Unauthenticated API calls → 401 Unauthorized
- [ ] Current Plaid routes (`/api/plaid/*`) should require auth
- [ ] Document auth pattern for future API endpoints

### 4. Session Context (Optional)
- [ ] Add user info to dashboard (show "logged in as Owner")
- [ ] Optional: Extend session to include user preferences

### 5. Documentation
- [ ] Add `.env.example` entry for `DASHBOARD_PASSWORD`
- [ ] Document how to set password for first run
- [ ] Add security note: change password if code leaks
- [ ] Document logout behavior

---

## Implementation Path

### Phase 1: Fix Route Protection (Today)
1. Create `src/components/LayoutContent.tsx` if needed
2. Test client-side redirect logic
3. Verify login form works
4. Verify logout works

### Phase 2: API Protection (Next)
1. Create auth middleware for `/api` routes
2. Test unauthenticated API calls → 401
3. Test authenticated API calls → pass through

### Phase 3: Testing & Documentation
1. Manual test on podman
2. Add to `.env.example`
3. Update `README.md` with setup instructions

---

## Key Files

| File | Purpose |
|------|---------|
| `src/auth.ts` | NextAuth config + Credentials provider |
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth API handler |
| `src/app/login/page.tsx` | Login UI (password form) |
| `src/middleware.ts` | Route protection (WIP) |
| `src/components/SidebarNav.tsx` | Sidebar + logout button |
| `src/components/LayoutContent.tsx` | Client-side auth routing (TODO) |
| `.env` | Contains `NEXTAUTH_SECRET`, `DASHBOARD_PASSWORD` |
| `podman-compose.yml` | Container config with auth env vars |

---

## Configuration

### Environment Variables (set in `.env`)
```
NEXTAUTH_SECRET=nKf5dqP5Q7CsdYkJVVVyYO8jEaJRhX922MBRgs+95+I=
NEXTAUTH_URL=http://localhost:4173
DASHBOARD_PASSWORD=<your-secure-password>
```

### Testing in Container
```bash
cd dashboard
podman-compose down && podman-compose up --build -d
# Wait 5-10 seconds for startup
curl http://localhost:4173/login
```

---

## Notes

- **NextAuth v5 Beta**: Using beta version; patterns may differ from v4
- **Credentials Provider**: Simple password-based auth (suitable for solo use)
- **Middleware Issue**: v5 beta middleware pattern may need adjustment based on docs
- **Plaid Integration**: Ready to add after auth is working (routes will be protected automatically)

---

## Next Steps

1. **Fix client-side redirect** → test login form
2. **Verify logout** → check session clearing
3. **Protect API routes** → add auth checks to Plaid endpoints
4. **Test Plaid flow** → integrate with auth session
5. **Document setup** → update README + .env.example
