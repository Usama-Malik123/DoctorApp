#!/bin/bash

# Install backend dependencies
pip install -r Backend/requirements.txt

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Start FastAPI backend with frontend served
uvicorn Backend.main:app --host 0.0.0.0 --port $PORT
