# Insurance Premium Prediction System

A modern web application that predicts insurance premium categories based on user demographics and lifestyle factors. Built with FastAPI for the backend and React with TypeScript for the frontend.

## Features

- **Real-time Premium Prediction**: Get instant predictions for insurance premium categories
- **Modern UI/UX**: Clean and intuitive user interface with responsive design
- **Input Validation**: Comprehensive form validation for accurate predictions
- **Detailed Results**: Clear presentation of prediction results with confidence scores
- **City Selection**: Predefined list of major Indian cities for accurate location-based predictions
- **Occupation Categories**: Standardized occupation options for consistent predictions

## Tech Stack

### Backend
- FastAPI (Python web framework)
- Scikit-learn (Machine Learning)
- Pandas (Data manipulation)
- Pickle (Model serialization)

### Frontend
- React with TypeScript
- Material-UI (Component library)
- Axios (HTTP client)
- Recharts (Data visualization)

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Insurance-premium-prediction
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn app:app --reload --port 8002
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
Insurance-premium-prediction/
├── app.py                 # FastAPI application
├── models/
│   ├── model.pkl         # Trained ML model
│   └── predict.py        # Prediction logic
├── schema/
│   ├── userinput.py      # Input data schema
│   └── predicted_response.py  # Response schema
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── package.json
└── requirements.txt
```

## API Endpoints

### Prediction Endpoint
- **URL**: `/predict`
- **Method**: `POST`
- **Input Parameters**:
  - `age`: number (1-120)
  - `weight`: number (in kg)
  - `height`: number (in meters)
  - `income_lpa`: number (annual income in LPA)
  - `smoker`: boolean
  - `city`: string (from predefined list)
  - `occupation`: string (from predefined list)
- **Response**:
  ```json
  {
    "predicted_category": string,
    "confidence": number
  }
  ```

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: Server status information

## Usage

1. Open the application in your web browser (default: http://localhost:3000)
2. Fill in the prediction form with the required information:
   - Age
   - Weight
   - Height
   - Annual Income
   - City (select from dropdown)
   - Occupation (select from dropdown)
   - Smoking status
3. Click "Predict Premium" to get the prediction
4. View the prediction result showing the category and confidence score

## Input Guidelines

- **Age**: Must be between 1 and 120 years
- **Weight**: Must be positive (in kilograms)
- **Height**: Must be between 0.1 and 2.5 meters
- **Income**: Must be non-negative (in LPA - Lakhs Per Annum)
- **City**: Select from the predefined list of major Indian cities
- **Occupation**: Choose from the available occupation categories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FastAPI documentation
- Material-UI components
- Scikit-learn documentation 