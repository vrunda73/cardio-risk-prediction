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
    redoc_url="/redoc"
)

# CORS configuration for Frontend (local + production origins)
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]
if allowed_origins_env:
    for origin in allowed_origins_env.split(","):
        stripped = origin.strip()
        if stripped and stripped not in origins:
            origins.append(stripped)

# Allow all origins if configured or wildcard
allow_all = "*" in origins or allowed_origins_env == "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if not allow_all else ["*"],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health Check"])
async def root():
    """
    Health check endpoint to verify that the backend API is running.
    """
    return {"message": "Cardio Risk Prediction API is running"}


@app.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Prediction"]
)
async def predict_cardio_risk(patient_data: PredictionRequest):
    """
    Predicts cardio risk based on patient clinical parameters.
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


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
