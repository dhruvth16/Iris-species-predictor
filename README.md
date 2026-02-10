# Iris Species Predictor

A full-stack web application for predicting iris flower species based on sepal and petal measurements. Built with React (Vite) frontend and FastAPI backend with machine learning.

## 🌸 Features

- **Interactive UI**: Beautiful, responsive interface for entering flower measurements
- **Real-time Predictions**: Get instant species predictions with confidence scores
- **Machine Learning**: Random Forest classifier trained on the famous Iris dataset
- **RESTful API**: FastAPI backend with automatic API documentation

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Modern CSS with gradients and animations

### Backend

- FastAPI
- scikit-learn (Random Forest Classifier)
- Pandas for data processing
- Joblib for model persistence

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment (recommended):

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Train the machine learning model:

```bash
python train_model.py
```

This will create an `iris_model.pkl` file with the trained model.

5. Start the FastAPI server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`

- API documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📊 API Endpoints

### POST `/predict`

Predict iris species based on measurements.

**Request Body:**

```json
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}
```

**Response:**

```json
{
  "species": "Iris-setosa",
  "confidence": 100.0
}
```

### GET `/health`

Check API health status.

### GET `/`

API information and available endpoints.

## 🌺 Iris Species

The model can predict three species of iris flowers:

- **Iris Setosa**: Small petals (0.1-0.6 cm wide)
- **Iris Versicolor**: Medium petals (1.0-1.8 cm wide)
- **Iris Virginica**: Large petals (1.4-2.5 cm wide)

## 📝 Usage

1. Make sure both backend and frontend servers are running
2. Open `http://localhost:3000` in your browser
3. Enter the measurements:
   - Sepal Length (cm)
   - Sepal Width (cm)
   - Petal Length (cm)
   - Petal Width (cm)
4. Click "Predict Species" to get the result
5. The prediction will show the species name and confidence percentage

## 🧪 Model Performance

The Random Forest classifier achieves high accuracy on the test set. Run `train_model.py` to see detailed metrics including:

- Accuracy score
- Classification report (precision, recall, f1-score)

## 🏗️ Project Structure

```
guess-flower-species/
├── Iris.csv                    # Dataset
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── train_model.py          # Model training script
│   ├── requirements.txt        # Python dependencies
│   └── iris_model.pkl          # Trained model (generated)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── App.css            # Styles
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML template
│   ├── package.json           # Node dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # This file
```

## 🔧 Development

### Backend Development

- The API supports hot-reload with uvicorn
- Access interactive API docs at `/docs`
- CORS is enabled for development (configure for production)

### Frontend Development

- Vite provides hot module replacement (HMR)
- Modern React with hooks (useState)
- Responsive design for mobile and desktop

## 📦 Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The optimized files will be in the `dist` directory.

### Backend

For production deployment:

1. Update CORS settings in `main.py`
2. Use a production ASGI server like gunicorn with uvicorn workers
3. Set up proper environment variables
4. Consider using Docker for containerization

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Iris dataset from the UCI Machine Learning Repository
- scikit-learn for machine learning tools
- FastAPI for the excellent web framework
- React and Vite for modern frontend development
