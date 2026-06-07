# FinTrackAI

> AI-powered financial tracking and analytics

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-000?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-000?style=for-the-badge&logo=docker)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-000?style=for-the-badge&logo=tailwindcss)

## Структура

```
FinTrackAI/
├── backend/          # Node.js API + Prisma ORM
│   ├── prisma/       # Schema + migrations
│   └── src/          # API routes, services
├── frontend/         # TypeScript + TailwindCSS
└── .github/
    └── workflows/    # CI (lint, typecheck, tests)
```

## Быстрый старт

```bash
git clone https://github.com/Ledgify/FinTrackAI.git
cd FinTrackAI
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate dev
npm run dev
```

## Команда

| Участник | Роль |
|----------|------|
| [@aitryhard](https://github.com/aitryhard) | Fullstack |
| [@AnotherL1fe](https://github.com/AnotherL1fe) | Frontend |
| [@l1umenncs](https://github.com/l1umenncs) | Backend / DevOps |
| [@mychoppabling](https://github.com/mychoppabling) | Frontend |

## Лицензия

MIT
