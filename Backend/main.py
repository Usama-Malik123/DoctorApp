from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from controllers import doctor_controller
from middlewares.cors_middleware import setup_cors
from logger_config.logger_config import logger
import os

app = FastAPI(title="Doctor API")

# Middleware setup
setup_cors(app)

# Include routers
app.include_router(doctor_controller.router)

# Serve frontend - Modified for Railway
frontend_dir = os.path.join(os.path.dirname(__file__), "../frontend/dist")
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="static")

# Explicit health check endpoint
@app.get("/api/health")
def health_check():
    return {
        "status": "API is running",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development")
    }

# Railway-specific startup (critical for port binding)
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        workers=1,
        log_config=None  # Uses your existing logger
    )
