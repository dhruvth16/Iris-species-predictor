import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [formData, setFormData] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sepal_length: parseFloat(formData.sepal_length),
          sepal_width: parseFloat(formData.sepal_width),
          petal_length: parseFloat(formData.petal_length),
          petal_width: parseFloat(formData.petal_width),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(
        "Failed to get prediction. Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      sepal_length: "",
      sepal_width: "",
      petal_length: "",
      petal_width: "",
    });
    setPrediction(null);
    setError(null);
  };

  const getSpeciesColor = (species) => {
    if (species.includes("setosa")) return "#4ade80";
    if (species.includes("versicolor")) return "#60a5fa";
    if (species.includes("virginica")) return "#f472b6";
    return "#a78bfa";
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🌸 Iris Species Predictor</h1>
        <p className="subtitle">
          Enter the measurements to predict the iris species
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="sepal_length">Sepal Length (cm)</label>
            <input
              type="number"
              id="sepal_length"
              name="sepal_length"
              value={formData.sepal_length}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              required
              placeholder="e.g., 5.1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="sepal_width">Sepal Width (cm)</label>
            <input
              type="number"
              id="sepal_width"
              name="sepal_width"
              value={formData.sepal_width}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              required
              placeholder="e.g., 3.5"
            />
          </div>

          <div className="input-group">
            <label htmlFor="petal_length">Petal Length (cm)</label>
            <input
              type="number"
              id="petal_length"
              name="petal_length"
              value={formData.petal_length}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              required
              placeholder="e.g., 1.4"
            />
          </div>

          <div className="input-group">
            <label htmlFor="petal_width">Petal Width (cm)</label>
            <input
              type="number"
              id="petal_width"
              name="petal_width"
              value={formData.petal_width}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              required
              placeholder="e.g., 0.2"
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Species"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="result-card error">
            <p>{error}</p>
          </div>
        )}

        {prediction && (
          <div className="result-card success">
            <h2>Prediction Result</h2>
            <div className="prediction-content">
              <div
                className="species-badge"
                style={{ backgroundColor: getSpeciesColor(prediction.species) }}
              >
                {prediction.species}
              </div>
              <div className="confidence">
                <span className="confidence-label">Confidence:</span>
                <span className="confidence-value">
                  {prediction.confidence}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="info-card">
          <h3>About Iris Species</h3>
          <ul>
            <li>
              <span style={{ color: "#4ade80" }}>●</span>{" "}
              <strong>Iris Setosa:</strong> Small petals, typically 0.1-0.6 cm
              wide
            </li>
            <li>
              <span style={{ color: "#60a5fa" }}>●</span>{" "}
              <strong>Iris Versicolor:</strong> Medium petals, typically 1.0-1.8
              cm wide
            </li>
            <li>
              <span style={{ color: "#f472b6" }}>●</span>{" "}
              <strong>Iris Virginica:</strong> Large petals, typically 1.4-2.5
              cm wide
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
