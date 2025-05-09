#!/bin/bash

# Install backend dependencies
pip install --no-cache-dir -r Backend/requirements.txt

# Build frontend
cd frontend
npm install --omit=dev
npm run build
cd ..

# Start FastAPI
python -m uvicorn Backend.main:app --host 0.0.0.0 --port $PORT
