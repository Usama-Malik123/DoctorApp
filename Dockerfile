# Use official Python image with Node installed
FROM python:3.10-slim

# Install Node.js and build tools
RUN apt-get update && apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set workdir
WORKDIR /app

# Copy everything
COPY . .

# Install backend dependencies
RUN pip install --no-cache-dir -r Backend/requirements.txt

# Install frontend dependencies (including dev dependencies)
WORKDIR /app/frontend
RUN npm install --verbose

# Build frontend using the prod-build script
RUN npm run prod-build

# Back to app root
WORKDIR /app

# Expose port
EXPOSE 8000

# Start app
CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
