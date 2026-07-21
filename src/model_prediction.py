import joblib
import pandas as pd


def predict(user_input):

    # ==========================
    # Load Saved Model
    # ==========================

    model_info = joblib.load("models/final_model.pkl")

    model = model_info["model"]

    trained_features = model_info["features"]

    # ==========================
    # Create DataFrame
    # ==========================

    df = pd.DataFrame([user_input])

    # ==========================
    # Add Missing Features
    # ==========================

    for feature in trained_features:

        if feature not in df.columns:

            df[feature] = 0

    # ==========================
    # Keep Same Order
    # ==========================

    df = df[trained_features]

    # ==========================
    # Prediction
    # ==========================

    prediction = model.predict(df)

    return float(prediction[0])