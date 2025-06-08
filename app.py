from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from schema.predicted_response import PredictionResponse
import sys
import os
from datetime import datetime
from collections import defaultdict

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from schema.userinput import UserInput

import pickle
import pandas as pd
from models.predict import predict_output

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for predictions (in a real app, this would be a database)
predictions_history = []

# Load the ml model
try:
    model_path = os.path.join('models', 'model.pkl')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise
    
    

@app.get('/')
def home():
    return {'message': 'Welcome to home page'}        

@app.get('/health')
def health():
    return {'status': 'OK', 'Last_API_Update':'08-Jun-2025'}
    
@app.post('/predict', response_model=PredictionResponse)
def predict_premium(data: UserInput):

    user_input = {
        'bmi': data.bmi,
        'age_group': data.age_group,
        'lifestyle_risk': data.lifestyle_risk,
        'city_tier': data.city_tier,
        'income_lpa': data.income_lpa,
        'occupation': data.occupation
    }

    try:
        prediction = predict_output(user_input, model)
        # Store the prediction in history
        predictions_history.append({
            'timestamp': datetime.now(),
            'prediction': prediction
        })
        return JSONResponse(status_code=200, content={'response': prediction})
    
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))

@app.get('/dashboard')
def get_dashboard_stats():
    if not predictions_history:
        return {
            'totalPredictions': 0,
            'averageConfidence': 0,
            'mostCommonCategory': 'N/A',
            'predictionsByCategory': []
        }

    # Calculate statistics
    total_predictions = len(predictions_history)
    total_confidence = sum(p['prediction']['confidence'] for p in predictions_history)
    average_confidence = total_confidence / total_predictions if total_predictions > 0 else 0

    # Count predictions by category
    category_counts = defaultdict(int)
    for p in predictions_history:
        category_counts[p['prediction']['predicted_category']] += 1

    # Find most common category
    most_common_category = max(category_counts.items(), key=lambda x: x[1])[0] if category_counts else 'N/A'

    # Format predictions by category for charts
    predictions_by_category = [
        {'name': category, 'value': count}
        for category, count in category_counts.items()
    ]

    return {
        'totalPredictions': total_predictions,
        'averageConfidence': average_confidence,
        'mostCommonCategory': most_common_category,
        'predictionsByCategory': predictions_by_category
    }