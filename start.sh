#!/bin/bash

# Install backend deps
pip install -r Backend/requirements.txt

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Start server
uvicorn Backend.main:app --host 0.0.0.0 --port $PORT
