#!/bin/bash

# Install backend dependencies
cd Backend
python3 -m pip install --no-cache-dir -r requirements.txt
cd ..

# Build frontend
cd frontend
npm install --omit=dev
npm run build
cd ..

# Start backend server
python3 -m uvicorn Backend.main:app --host 0.0.0.0 --port 8000
