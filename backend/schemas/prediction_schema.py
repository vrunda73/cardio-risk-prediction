from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    id: Optional[int] = Field(None, description="Patient ID (optional)", examples=[3])
    age: float = Field(..., ge=1, le=40000, description="Age in years (e.g. 50) or in days (e.g. 18250)", examples=[50])
    gender: int = Field(..., ge=1, le=2, description="Gender: 1 for female, 2 for male", examples=[1])
    height: float = Field(..., ge=50, le=250, description="Height in cm", examples=[170])
    weight: float = Field(..., ge=10, le=350, description="Weight in kg", examples=[70])
    ap_hi: int = Field(..., ge=40, le=300, description="Systolic blood pressure (mmHg)", examples=[120])
    ap_lo: int = Field(..., ge=30, le=220, description="Diastolic blood pressure (mmHg)", examples=[80])
    cholesterol: int = Field(..., ge=1, le=3, description="Cholesterol (1: normal, 2: above normal, 3: well above normal)", examples=[1])
    gluc: int = Field(..., ge=1, le=3, description="Glucose (1: normal, 2: above normal, 3: well above normal)", examples=[1])
    smoke: int = Field(..., ge=0, le=1, description="Smoking status: 0 for no, 1 for yes", examples=[0])
    alco: int = Field(..., ge=0, le=1, description="Alcohol intake: 0 for no, 1 for yes", examples=[0])
    active: int = Field(..., ge=0, le=1, description="Physical activity: 0 for no, 1 for yes", examples=[1])

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 3,
                "age": 50,
                "gender": 1,
                "height": 170,
                "weight": 70,
                "ap_hi": 120,
                "ap_lo": 80,
                "cholesterol": 1,
                "gluc": 1,
                "smoke": 0,
                "alco": 0,
                "active": 1
            }
        }
    }


class ModelDetail(BaseModel):
    prediction: int = Field(..., description="Binary prediction: 0 or 1", examples=[0])
    risk: str = Field(..., description="Risk status: YES or NO", examples=["NO"])
    probability: float = Field(..., description="Model probability for cardio risk (0.0 - 1.0)", examples=[0.3128])
    percentage: float = Field(..., description="Risk percentage (e.g. 31.28)", examples=[31.28])
    performance_percentage: str = Field(..., description="Formatted probability percentage string", examples=["31.28%"])
    accuracy_percentage: Optional[str] = Field(None, description="Trained model benchmark test accuracy percentage", examples=["72.79%"])


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="Final prediction label: 0 (No risk) or 1 (Risk detected)", examples=[0])
    result: str = Field(..., description="Prediction outcome message", examples=["No Cardio Risk Detected"])
    risk: str = Field(..., description="Risk outcome: YES or NO", examples=["NO"])
    risk_level: str = Field(..., description="Risk tier: Lower Risk or Higher Risk", examples=["Lower Risk"])
    probability: float = Field(..., description="Logistic regression cardio risk probability (0.0 to 1.0)", examples=[0.3128])
    percentage: float = Field(..., description="Logistic regression final performance risk in percentage", examples=[31.28])
    performance_percentage: str = Field(..., description="Logistic regression performance formatted string", examples=["31.28%"])
    bmi: float = Field(..., description="Body Mass Index (BMI)", examples=[24.22])
    message: str = Field(..., description="Clinical summary message", examples=["No Cardio Risk Detected - Logistic Regression model confidence: 31.28%"])
    recommendations: List[str] = Field(default_factory=list, description="Personalized health recommendations")
    feature_importance: Dict[str, float] = Field(default_factory=dict, description="Normalized feature importance scores")
    model_predictions: Dict[str, float] = Field(default_factory=dict, description="Model probability dictionary for UI components")
    models: Dict[str, ModelDetail] = Field(default_factory=dict, description="Comprehensive multi-model predictions and performance breakdown")
