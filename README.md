# PaperScript

Enterprise-grade SaaS platform for scientific journal publishing. AI-powered manuscript formatting, real-time collaboration, and multi-format publishing.

## Features

- **AI-Powered DOCX → LaTeX Conversion** — Upload Word documents and convert them to publication-ready LaTeX using journal templates
- **Real-Time Collaborative Editor** — Overleaf-style LaTeX editing with multi-cursor, commenting, and track changes
- **Journal Template System** — Publisher-approved templates with class files, bibliography styles, and custom macros
- **Multi-Format Export** — PDF, LaTeX, HTML, XML, JATS XML, ePUB
- **Enterprise SaaS** — RBAC, subscription billing, API keys, audit logs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.12+, FastAPI, SQLAlchemy 2.0, Alembic |
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Storage | MinIO (S3-compatible) |
| Editor | CodeMirror 6 + Y.js (CRDT) |
| LaTeX | TeX Live 2024 (Docker) |
| Infrastructure | Docker Compose, Nginx, Let's Encrypt |

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for frontend development)
- Python 3.12+ (for backend development)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/paperscript.git
cd paperscript

# Copy environment variables
cp .env.example .env

# Start all services
docker compose up -d

# Backend is available at http://localhost:8000
# Frontend is available at http://localhost:3000
# API docs at http://localhost:8000/docs
```

### Running Backend Locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload
```

### Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
paperscript/
├── backend/          # FastAPI application
├── frontend/         # Next.js application
├── latex-service/    # Docker-based LaTeX compiler
├── nginx/            # Reverse proxy configuration
├── docs/             # Project documentation
└── docker-compose.yml
```

## Development Phases

1. ✅ **Phase 1** — Product Planning (PRD, architecture, schema, API design)
2. 🔄 **Phase 2** — Landing Page + Authentication
3. ⬜ **Phase 3** — Admin Dashboard
4. ⬜ **Phase 4** — Document System (DOCX parser, LaTeX converter)
5. ⬜ **Phase 5** — Collaboration (real-time editing)
6. ⬜ **Phase 6** — Publishing Outputs (multi-format export)

## License

Proprietary — All rights reserved.
