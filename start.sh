#!/bin/bash

python3 -m pip install --no-cache-dir -r requirements.txt

# Build frontend
cd frontend
npm install --omit=dev
npm run build
cd ..

uvicorn Backend.main:app --host 0.0.0.0 --port 8000
