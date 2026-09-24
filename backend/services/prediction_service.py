import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional
from schemas.prediction_schema import PredictionRequest, PredictionResponse, ModelDetail


class PredictionService:
    FEATURE_COLUMNS = [
        "age",
        "gender",
        "height",
        "weight",
        "ap_hi",
        "ap_lo",
        "cholesterol",
        "gluc",
        "smoke",
        "alco",
        "active"
    ]

    MODEL_ACCURACIES = {
        "logistic_regression": "72.79%",
        "knn": "69.16%",
        "naive_bayes": "71.45%",
        "decision_tree": "63.05%"
    }

    def __init__(self, models_dir: Optional[str] = None):
        if models_dir is None:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            models_dir = os.path.join(os.path.dirname(current_dir), "models")
        self.models_dir = models_dir
        self.scaler_path = os.path.join(self.models_dir, "scaler.pkl")
        self.scaler = None
        self.models: Dict[str, Any] = {}
        self._load_artifacts()

    def _load_artifacts(self) -> None:
        """Loads the pre-fitted scaler and all trained ML models."""
        if not os.path.exists(self.scaler_path):
            raise FileNotFoundError(
                f"Scaler file not found at '{self.scaler_path}'. Please ensure scaler.pkl exists in the models folder."
            )

        try:
            self.scaler = joblib.load(self.scaler_path)
        except Exception as e:
            raise RuntimeError(f"Failed to load scaler artifact: {str(e)}")

        model_files = {
            "logistic_regression": ["logistic_regression.pkl", "model.pkl"],
            "knn": ["knn.pkl"],
            "naive_bayes": ["naive_bayes.pkl"],
            "decision_tree": ["decision_tree.pkl"],
        }

        for model_name, filenames in model_files.items():
            loaded = False
            for filename in filenames:
                file_path = os.path.join(self.models_dir, filename)
                if os.path.exists(file_path):
                    try:
                        self.models[model_name] = joblib.load(file_path)
                        loaded = True
                        break
                    except Exception as e:
                        print(f"Warning: Failed to load {filename}: {e}")
            if not loaded and model_name == "logistic_regression":
                raise FileNotFoundError(
                    f"Primary model file not found in '{self.models_dir}'. Please ensure model.pkl or logistic_regression.pkl exists."
                )

    def preprocess_input(self, data: PredictionRequest) -> pd.DataFrame:
        """
        Converts the request into a DataFrame with exact feature columns.
        Converts age in years to days if input age <= 120 (since dataset used age in days).
        """
        age_in_days = data.age
        if age_in_days <= 120:
            age_in_days = age_in_days * 365.25

        row = {
            "age": float(age_in_days),
            "gender": int(data.gender),
            "height": float(data.height),
            "weight": float(data.weight),
            "ap_hi": int(data.ap_hi),
            "ap_lo": int(data.ap_lo),
            "cholesterol": int(data.cholesterol),
            "gluc": int(data.gluc),
            "smoke": int(data.smoke),
            "alco": int(data.alco),
            "active": int(data.active)
        }

        # Return DataFrame with exact feature column order
        return pd.DataFrame([row], columns=self.FEATURE_COLUMNS)

    def _generate_recommendations(self, data: PredictionRequest, bmi: float, is_risk: bool) -> List[str]:
        """Generates evidence-based health recommendations tailored to patient metrics."""
        recs = []
        if is_risk:
            recs.append("Consult a cardiologist or primary healthcare provider for a thorough cardiovascular evaluation.")
        
        if data.ap_hi >= 130 or data.ap_lo >= 85:
            recs.append(f"Monitor blood pressure regularly. Current reading ({data.ap_hi}/{data.ap_lo} mmHg) is elevated.")
        else:
            recs.append("Maintain optimal blood pressure through balanced nutrition and low sodium intake.")

        if data.cholesterol > 1:
            recs.append("Adopt a heart-healthy diet rich in soluble fiber and omega-3 fatty acids to manage cholesterol levels.")

        if data.gluc > 1:
            recs.append("Monitor blood glucose levels and limit refined sugars and simple carbohydrates.")

        if data.smoke == 1:
            recs.append("Smoking significantly increases arterial plaque risk; consider smoking cessation support.")

        if data.active == 0:
            recs.append("Incorporate at least 150 minutes of moderate aerobic physical activity per week.")
        else:
            recs.append("Continue regular physical activity to sustain cardiovascular fitness.")

        if bmi >= 25.0:
            recs.append(f"Aim for a healthy weight range (current BMI: {bmi:.1f}). Even modest weight loss reduces cardiac workload.")

        return recs[:6]

    def _compute_feature_importance(self) -> Dict[str, float]:
        """Extracts and normalizes feature importance weights from the Logistic Regression model."""
        lr_model = self.models.get("logistic_regression")
        if lr_model is not None and hasattr(lr_model, "coef_"):
            try:
                coefs = np.abs(lr_model.coef_[0])
                total = np.sum(coefs)
                if total > 0:
                    norm_coefs = coefs / total
                    return {col: round(float(norm_coefs[i]), 4) for i, col in enumerate(self.FEATURE_COLUMNS)}
            except Exception:
                pass
        return {}

    def predict(self, request_data: PredictionRequest) -> PredictionResponse:
        """
        Applies preprocessing and runs prediction across all trained ML models.
        Returns percentage performance for each model and final Logistic Regression outcome.
        """
        if self.scaler is None or not self.models:
            self._load_artifacts()

        # Preprocess input to DataFrame with valid feature names
        df_input = self.preprocess_input(request_data)

        # Apply the pre-fitted scaler
        scaled_array = self.scaler.transform(df_input)
        df_scaled = pd.DataFrame(scaled_array, columns=self.FEATURE_COLUMNS)

        # Multi-model evaluation
        model_details: Dict[str, ModelDetail] = {}
        model_probas: Dict[str, float] = {}

        for model_key in ["logistic_regression", "knn", "naive_bayes", "decision_tree"]:
            model = self.models.get(model_key)
            if model is None:
                continue

            # Decision Tree was trained on unscaled features with feature names (X_train)
            # LR, KNN, and Naive Bayes were trained on scaled numpy arrays (X_train_scaled)
            if model_key == "decision_tree":
                input_for_model = df_input
            else:
                input_for_model = scaled_array

            # Model prediction
            raw_pred = model.predict(input_for_model)
            pred_label = int(raw_pred[0])
            risk_label = "YES" if pred_label == 1 else "NO"

            # Model probability
            if hasattr(model, "predict_proba"):
                try:
                    proba_classes = model.predict_proba(input_for_model)[0]
                    # Probability for class 1 (cardio risk)
                    prob_val = float(proba_classes[1]) if len(proba_classes) > 1 else float(proba_classes[0])
                except Exception:
                    prob_val = float(pred_label)
            else:
                prob_val = float(pred_label)

            prob_val = max(0.0, min(1.0, prob_val))
            pct_val = round(prob_val * 100.0, 2)
            perf_str = f"{pct_val:.2f}%"

            acc_str = self.MODEL_ACCURACIES.get(model_key)

            model_details[model_key] = ModelDetail(
                prediction=pred_label,
                risk=risk_label,
                probability=round(prob_val, 4),
                percentage=pct_val,
                performance_percentage=perf_str,
                accuracy_percentage=acc_str
            )
            model_probas[model_key] = round(prob_val, 4)

        # Primary model outcome: Logistic Regression
        lr_detail = model_details.get("logistic_regression")
        if lr_detail is not None:
            primary_pred = lr_detail.prediction
            primary_risk = lr_detail.risk
            primary_proba = lr_detail.probability
            primary_pct = lr_detail.percentage
            primary_perf_pct = lr_detail.performance_percentage
        else:
            first_key = next(iter(model_details))
            primary_pred = model_details[first_key].prediction
            primary_risk = model_details[first_key].risk
            primary_proba = model_details[first_key].probability
            primary_pct = model_details[first_key].percentage
            primary_perf_pct = model_details[first_key].performance_percentage

        result_text = "Cardio Risk Detected" if primary_pred == 1 else "No Cardio Risk Detected"
        risk_level = "Higher Risk" if (primary_pred == 1 or primary_proba >= 0.5) else "Lower Risk"

        # Calculate BMI
        height_m = request_data.height / 100.0
        bmi = round(request_data.weight / (height_m * height_m), 2) if height_m > 0 else 0.0

        # Feature importance
        feature_importance = self._compute_feature_importance()

        # Dynamic recommendations
        recommendations = self._generate_recommendations(request_data, bmi, primary_pred == 1)

        summary_message = (
            f"{result_text} ({primary_risk}) with Logistic Regression confidence: {primary_perf_pct}"
        )

        return PredictionResponse(
            prediction=primary_pred,
            result=result_text,
            risk=primary_risk,
            risk_level=risk_level,
            probability=primary_proba,
            percentage=primary_pct,
            performance_percentage=primary_perf_pct,
            bmi=bmi,
            message=summary_message,
            recommendations=recommendations,
            feature_importance=feature_importance,
            model_predictions=model_probas,
            models=model_details
        )


# Global singleton instance
prediction_service = PredictionService()
