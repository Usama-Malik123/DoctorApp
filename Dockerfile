# Start with a base image that has both Node and Python
FROM python:3.11-slim

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY Backend/ Backend/
RUN pip install --no-cache-dir -r Backend/requirements.txt

# Build frontend
COPY frontend/ frontend/
WORKDIR /app/frontend
RUN npm install --omit=dev && npm run build

# Move back to backend
WORKDIR /app

# Expose port
EXPOSE 8000

# Start FastAPI app
CMD ["python", "-m", "uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
