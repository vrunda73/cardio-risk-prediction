# Cardio Risk Prediction - FastAPI Backend

FastAPI backend service for predicting cardiovascular risk using machine learning classification models trained on clinical data.

---

## 📁 Project Structure

```text
backend/
├── main.py                     # FastAPI application, CORS, endpoints & error handlers
├── requirements.txt            # Python dependencies
├── models/                     # Saved .pkl models and preprocessing objects
│   ├── scaler.pkl              # Fitted StandardScaler
│   ├── model.pkl               # Default trained Logistic Regression model
│   ├── logistic_regression.pkl # Logistic Regression model
│   ├── knn.pkl                 # K-Nearest Neighbors model
│   ├── naive_bayes.pkl         # Gaussian Naive Bayes model
│   └── decision_tree.pkl       # Decision Tree Classifier
├── schemas/
│   └── prediction_schema.py    # PredictionRequest & PredictionResponse schemas
├── services/
│   └── prediction_service.py   # Multi-model evaluation, scaling & inference logic
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### 1. Install Dependencies

Open your terminal in the `backend` folder and install the required packages:

```bash
cd d:\backend_FA\backend
pip install -r requirements.txt
```

### 2. Start the Backend Server

Run the development server using Uvicorn:

```bash
uvicorn main:app --reload
```

The server will start at:
- **API URL:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`
- **Alternative Redoc:** `http://127.0.0.1:8000/redoc`

---

## 📡 API Endpoints

### 1. Health Check
- **Endpoint:** `GET /`
- **Response:**
```json
{
  "message": "Cardio Risk Prediction API is running"
}
```

---

### 2. Predict Cardio Risk
- **Endpoint:** `POST /predict`
- **Request Body:**
```json
{
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
```

- **Response:**
```json
{
  "prediction": 0,
  "result": "No Cardio Risk Detected",
  "risk": "NO",
  "risk_level": "Lower Risk",
  "probability": 0.3128,
  "percentage": 31.28,
  "performance_percentage": "31.28%",
  "bmi": 24.22,
  "message": "No Cardio Risk Detected (NO) with Logistic Regression confidence: 31.28%",
  "recommendations": [
    "Maintain optimal blood pressure through balanced nutrition and low sodium intake.",
    "Continue regular physical activity to sustain cardiovascular fitness."
  ],
  "feature_importance": {
    "age": 0.1568,
    "gender": 0.0031,
    "height": 0.0141,
    "weight": 0.0731,
    "ap_hi": 0.4123,
    "ap_lo": 0.0561,
    "cholesterol": 0.1592,
    "gluc": 0.036,
    "smoke": 0.0224,
    "alco": 0.0247,
    "active": 0.0422
  },
  "model_predictions": {
    "logistic_regression": 0.3128,
    "knn": 0.4,
    "naive_bayes": 0.1011,
    "decision_tree": 1.0
  },
  "models": {
    "logistic_regression": {
      "prediction": 0,
      "risk": "NO",
      "probability": 0.3128,
      "percentage": 31.28,
      "performance_percentage": "31.28%",
      "accuracy_percentage": "72.79%"
    },
    "knn": {
      "prediction": 0,
      "risk": "NO",
      "probability": 0.4,
      "percentage": 40.0,
      "performance_percentage": "40.00%",
      "accuracy_percentage": "69.16%"
    },
    "naive_bayes": {
      "prediction": 0,
      "risk": "NO",
      "probability": 0.1011,
      "percentage": 10.11,
      "performance_percentage": "10.11%",
      "accuracy_percentage": "71.45%"
    },
    "decision_tree": {
      "prediction": 1,
      "risk": "YES",
      "probability": 1.0,
      "percentage": 100.0,
      "performance_percentage": "100.00%",
      "accuracy_percentage": "63.05%"
    }
  }
}
```

---

## 🌐 Frontend React Integration

In your React app (running on `http://localhost:3000` or `http://localhost:5173`), you can call the API using `axios`:

```javascript
import axios from 'axios';

const patientData = {
  age: 50,
  gender: 1,
  height: 170,
  weight: 70,
  ap_hi: 120,
  ap_lo: 80,
  cholesterol: 1,
  gluc: 1,
  smoke: 0,
  alco: 0,
  active: 1
};

const checkCardioRisk = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/predict', patientData);
    console.log(response.data);
  } catch (error) {
    console.error('Prediction Error:', error);
  }
};
```
