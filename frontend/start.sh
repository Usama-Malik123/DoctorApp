#!/bin/bash

# Install backend deps
cd Backend && pip install --no-cache-dir -r requirements.txt && cd ..

# Build frontend (if needed)
cd frontend && npm install --omit=dev && npm run build && cd ..

# Start FastAPI (critical changes)
exec python Backend/main.py
