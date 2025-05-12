#!/bin/bash

# Debugging: Print current directory and files
echo "Current directory: $(pwd)"
ls -la

# Install backend deps
cd Backend && pip install -r requirements.txt && cd ..

# Start server (absolute Python path)
exec /opt/python/bin/python -m Backend.main
