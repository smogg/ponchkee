# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ponchkee is a Polish SaaS application for mobile car detailing businesses that provides WhatsApp-based lead qualification funnels. It's a monorepo with two applications:

- **Dashboard** (`/apps/dashboard/`): React 19 + TypeScript admin interface with Clerk auth
- **Web** (`/apps/web/`): Astro.js marketing landing page

## Development Commands

### Dashboard (React/TypeScript)
```bash
cd apps/dashboard
npm run dev       # Development server with HMR
npm run build     # Production build
npm run lint      # ESLint checking
npm run preview   # Preview production build
```

### Web (Astro)
```bash
cd apps/web
npm run dev       # Development server
npm run build     # Build static site
```

## Architecture & Patterns

### Frontend Architecture
- **Dashboard**: React 19 with TanStack Router (file-based routing) and TanStack Query
- **Authentication**: Clerk integration with protected routes
- **Build**: Vite with TypeScript, ESLint 9 with strict rules
- **State**: TanStack Query for server state, local React state for UI
- **Web**: Astro.js static site generation for marketing content

### Key Directories
- `apps/dashboard/src/`: React/TypeScript source code
- `apps/web/src/`: Astro components and pages
- `docs/`: Product specifications and requirements

## Environment Setup

### Required Tools
- Node.js 18+ (uses pnpm package manager)

### Environment Variables
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk authentication key

## Testing

- **Frontend Testing**: ESLint configured for both apps, unit testing framework not yet set up

## Development Workflow

1. **Frontend development**: Components follow modern React patterns with hooks
2. **Routing**: TanStack Router with file-based structure in dashboard
3. **Content**: Static marketing content in Astro.js

## Current Implementation Status

The codebase has complete frontend development infrastructure but needs:
- Backend API implementation (technology to be determined)
- WhatsApp webhook integration
- Lead qualification logic
- Dashboard UI components for lead management
- Complete test coverage

## Production Deployment

- **Web**: Netlify deployment configured in `netlify.toml`
- **Dashboard**: Vite build ready for static hosting