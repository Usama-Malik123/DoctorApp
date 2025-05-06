from fastapi import FastAPI
from controllers import doctor_controller
from middlewares.cors_middleware import setup_cors
from logger_config.logger_config import logger

app = FastAPI(title="Doctor API")

# Middleware setup
setup_cors(app)

# Include routers
app.include_router(doctor_controller.router)

@app.get("/")
def health_check():
    return {"status": "API is running"}
