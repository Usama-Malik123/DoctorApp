# Use official Python image with Node installed
FROM python:3.10-slim

# Install Node.js manually
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set workdir
WORKDIR /app

# Copy everything
COPY . .

# Install backend dependencies
RUN pip install --no-cache-dir -r Backend/requirements.txt

# Install frontend dependencies & build
WORKDIR /app/frontend
RUN npm install --omit=dev && npm run build

# Back to app root
WORKDIR /app

# Expose port
EXPOSE 8000

# Start app
CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
