#!/bin/bash

# Install backend deps
pip install --no-cache-dir -r Backend/requirements.txt

# Build frontend with production settings
cd frontend
npm install --omit=dev
npm audit fix
npm run build
cd ..

# Start server
uvicorn Backend.main:app --host 0.0.0.0 --port $PORT

