# Use official Python + Node.js base image
FROM python:3.10-slim

# Install Node.js & npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy entire app (Backend + frontend)
COPY . .

# --------- Frontend setup ---------
WORKDIR /app/frontend

# Install dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Optional: Clean up node_modules and reinstall prod-only
RUN rm -rf node_modules && npm install --omit=dev

# --------- Backend setup ---------
WORKDIR /app/Backend

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set PYTHONPATH so imports like `from db.database` work
ENV PYTHONPATH="/app/Backend:${PYTHONPATH}"

# --------- Start FastAPI ---------
WORKDIR /app

EXPOSE 8000

CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
