import os

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from schemas.prediction_schema import PredictionRequest, PredictionResponse
from services.prediction_service import prediction_service


# ============================================================
# FastAPI Application
# ============================================================

app = FastAPI(
    title="Cardio Risk Prediction API",
    description="FastAPI backend to predict cardiovascular disease risk from patient clinical features.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)


# ============================================================
# CORS Configuration
# ============================================================

# Frontend URLs allowed to call this API
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Optional: allow additional origins from Render environment variable
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")

if allowed_origins_env:
    if allowed_origins_env.strip() == "*":
        allowed_origins = ["*"]
    else:
        for origin in allowed_origins_env.split(","):
            origin = origin.strip()

            if origin and origin not in allowed_origins:
                allowed_origins.append(origin)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Health Check
# ============================================================

@app.get("/", tags=["Health Check"])
async def root():
    """
    Health check endpoint to verify that the backend API is running.
    """
    return {
        "message": "Cardio Risk Prediction API is running"
    }


# ============================================================
# Prediction Endpoint
# ============================================================

@app.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Prediction"]
)
async def predict_cardio_risk(
    patient_data: PredictionRequest
):
    """
    Predict cardiovascular disease risk
    based on patient clinical parameters.
    """

    try:
        response = prediction_service.predict(patient_data)

        return response

    except FileNotFoundError as fnf_err:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Model artifact missing: {str(fnf_err)}"
        )

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error occurred: {str(e)}"
        )


# ============================================================
# Run Application
# ============================================================

if __name__ == "__main__":

    import uvicorn

    port = int(os.getenv("PORT", 8000))

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )