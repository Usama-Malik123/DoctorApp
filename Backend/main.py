from fastapi.responses import FileResponse
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from Backend.controllers import doctor_controller
from middlewares.cors_middleware import setup_cors
from logger_config.logger_config import logger
import os

app = FastAPI(title="Doctor API")

# CORS
setup_cors(app)

# API Routers
app.include_router(doctor_controller.router)

# Serve frontend in production
if os.getenv("RAILWAY_ENVIRONMENT"):
    app.mount("/", StaticFiles(directory="Backend/static", html=True), name="static")

    # Catch-all fallback for React routes
    @app.exception_handler(404)
    async def custom_404_handler(request: Request, exc):
        file_path = os.path.join("Backend", "static", "index.html")
        if os.path.exists(file_path):
            return FileResponse(file_path)
        return {"detail": "Not Found"}

# Health check
@app.get("/api/health")
def health_check():
    return {"status": "API is running"}
