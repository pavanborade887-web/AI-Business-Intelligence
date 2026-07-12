import joblib

from data_loader import load_data
from feature_engineering import feature_engineering


def predict(file_path):
    """
    Predict using the trained model.
    """

    # Load model information
    model_info = joblib.load("models/final_model.pkl")

    model = model_info["model"]
    target = model_info["target"]
    trained_features = model_info["features"]

    # Load new dataset
    df = load_data(file_path)

    # Apply feature engineering
    df = feature_engineering(df)

    # Remove target column if present
    if target in df.columns:
        df = df.drop(columns=[target])

    # Add missing columns
    for col in trained_features:
        if col not in df.columns:
            df[col] = 0

    # Remove extra columns
    df = df[trained_features]

    # Prediction
    predictions = model.predict(df)

    return predictions


if __name__ == "__main__":

    predictions = predict("uploads/superstore_sales.csv")

    print("\n========== PREDICTIONS ==========")
    print(predictions[:10])