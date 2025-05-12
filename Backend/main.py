from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from Backend.controllers import doctor_controller
from middlewares.cors_middleware import setup_cors
from logger_config.logger_config import logger
import os

app = FastAPI(title="Doctor API")

# Middleware setup
setup_cors(app)

# Include routers
app.include_router(doctor_controller.router)

# Serve frontend in production (Railway)
if os.getenv("RAILWAY_ENVIRONMENT"):
    app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app():
        return FileResponse("frontend/dist/index.html")

# Health check
@app.get("/api/health")
def health_check():
    return {"status": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
