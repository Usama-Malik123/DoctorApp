#!/bin/bash

# Install backend deps using exact Python path
/opt/python/bin/python -m pip install --no-cache-dir -r requirements.txt

# Build frontend
cd frontend
npm install --omit=dev
npm run build
cd ..

# Start server using absolute Python path
/opt/python/bin/python -m uvicorn Backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1
