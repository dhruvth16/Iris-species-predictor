from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os
from fastapi import Response

app = FastAPI(title="Iris Species Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://iris-species-predictor.vercel.app", "http://localhost:3000"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "iris_model.pkl")
model = None

@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "https://iris-species-predictor.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
    )

@app.on_event("startup")
async def load_model():
    global model
    print("Current working directory:", os.getcwd())
    print("Files in directory:", os.listdir())
    
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("Model loaded successfully!")
    else:
        print(f"Model NOT found at {MODEL_PATH}")

class IrisFeatures(BaseModel):
    sepal_length: float = Field(..., ge=0, le=10, description="Sepal Length in cm")
    sepal_width: float = Field(..., ge=0, le=10, description="Sepal Width in cm")
    petal_length: float = Field(..., ge=0, le=10, description="Petal Length in cm")
    petal_width: float = Field(..., ge=0, le=10, description="Petal Width in cm")

class PredictionResponse(BaseModel):
    species: str
    confidence: float

@app.get("/")
async def root():
    return {
        "message": "Iris Species Prediction API",
        "endpoints": {
            "/predict": "POST - Predict iris species",
            "/health": "GET - Check API health"
        }
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_species(features: IrisFeatures):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first by running train_model.py"
        )
    
    try:
        input_data = np.array([[
            features.sepal_length,
            features.sepal_width,
            features.petal_length,
            features.petal_width
        ]])
        
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        confidence = float(max(probabilities))
        
        return PredictionResponse(
            species=prediction,
            confidence=round(confidence * 100, 2)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
