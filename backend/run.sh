#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

export MONGO_URI=${MONGO_URI:-"mongodb+srv://ditapiam_db_user:WDCnM4oaAVmJtAkJ@paginaweb.kqv8zos.mongodb.net/"}
export DB_NAME=${DB_NAME:-"capibites"}
export COL_PRODUCTS=${COL_PRODUCTS:-"productos"}
export COL_ORDERS=${COL_ORDERS:-"pedidos"}
export CORS_ORIGIN=${CORS_ORIGIN:-"http://localhost:3000"}
PORT=${SERVER_PORT:-3001}
uvicorn backend.app:app --host 0.0.0.0 --port "$PORT"
