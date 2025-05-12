from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from Backend.controllers import doctor_controller
from middlewares.cors_middleware import setup_cors
from logger_config.logger_config import logger
import os

app = FastAPI(title="Doctor API")

# Middleware setup
setup_cors(app)

# Include routers
app.include_router(doctor_controller.router)

# Serve frontend in production
if os.getenv("RAILWAY_ENVIRONMENT"):
    app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")

@app.get("/api/health")
def health_check():
    return {"status": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
