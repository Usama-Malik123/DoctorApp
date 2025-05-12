# Use official Python image with Node installed
FROM python:3.10-slim

# Install Node.js and required tools
RUN apt-get update && apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set workdir
WORKDIR /app

# Copy all files
COPY . .

# Install backend dependencies
RUN pip install --no-cache-dir -r Backend/requirements.txt

# Move into frontend directory
WORKDIR /app/frontend

# ✅ Install all (including devDependencies) to build
RUN npm install

# ✅ Run frontend build (this needs Vite + plugin-react etc.)
RUN npm run build

# ✅ Optional: Remove node_modules and reinstall only prod deps
RUN rm -rf node_modules && npm install --omit=dev

# Back to app root
WORKDIR /app

# Expose backend port
EXPOSE 8000

# Start backend (FastAPI)
CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
