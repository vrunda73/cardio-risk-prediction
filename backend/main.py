import os

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from schemas.prediction_schema import PredictionRequest, PredictionResponse
from services.prediction_service import prediction_service


app = FastAPI(
    title="Cardio Risk Prediction API",
    description="FastAPI backend to predict cardiovascular disease risk from patient clinical features.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "").strip()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Add origins from Render environment variable if provided
if allowed_origins_env and allowed_origins_env != "*":
    for origin in allowed_origins_env.split(","):
        origin = origin.strip()
        if origin and origin not in origins:
            origins.append(origin)


# Allow all origins if ALLOWED_ORIGINS=*
if allowed_origins_env == "*":
    origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "message": "Cardio Risk Prediction API is running"
    }


# ============================================================
# PREDICTION
# ============================================================

@app.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Prediction"],
)
async def predict_cardio_risk(
    patient_data: PredictionRequest
):
    try:
        response = prediction_service.predict(patient_data)
        return response

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Model artifact missing: {str(error)}",
        )

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error occurred: {str(error)}",
        )


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
    )