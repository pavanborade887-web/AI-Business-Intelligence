# PART 1

from src.data_loader import load_data
from src.feature_engineering import feature_engineering

from sklearn.model_selection import train_test_split

from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

import joblib
import os


def train_model(file_path, target_column):

    # ==========================
    # Load Dataset
    # ==========================

    df = load_data(file_path)

    # ==========================
    # Feature Engineering
    # ==========================

    df = feature_engineering(df)

    # ==========================
    # Check Target
    # ==========================

    if target_column not in df.columns:
        raise ValueError(
            f"{target_column} not found in dataset."
        )

    # ==========================
    # Features & Target
    # ==========================

    X = df.drop(columns=[target_column])

    y = df[target_column]

    # ==========================
    # Train Test Split
    # ==========================

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )


    # PART 2

        # ==========================
    # Linear Regression
    # ==========================

    lr_model = LinearRegression()

    lr_model.fit(X_train, y_train)

    lr_predictions = lr_model.predict(X_test)

    lr_r2 = r2_score(y_test, lr_predictions)

    lr_mae = mean_absolute_error(
        y_test,
        lr_predictions
    )

    lr_rmse = mean_squared_error(
        y_test,
        lr_predictions
    ) ** 0.5

    # ==========================
    # Decision Tree
    # ==========================

    dt_model = DecisionTreeRegressor(
        random_state=42
    )

    dt_model.fit(X_train, y_train)

    dt_predictions = dt_model.predict(X_test)

    dt_r2 = r2_score(y_test, dt_predictions)

    dt_mae = mean_absolute_error(
        y_test,
        dt_predictions
    )

    dt_rmse = mean_squared_error(
        y_test,
        dt_predictions
    ) ** 0.5

    # ==========================
    # Random Forest
    # ==========================

    rf_model = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    rf_model.fit(X_train, y_train)

    rf_predictions = rf_model.predict(X_test)

    rf_r2 = r2_score(y_test, rf_predictions)

    rf_mae = mean_absolute_error(
        y_test,
        rf_predictions
    )

    rf_rmse = mean_squared_error(
        y_test,
        rf_predictions
    ) ** 0.5

    print("\n========== MODEL COMPARISON ==========")

    print("Linear Regression R2 :", lr_r2)
    print("Decision Tree R2     :", dt_r2)
    print("Random Forest R2     :", rf_r2)


    # PART 3

        # ==========================
    # Compare Models
    # ==========================

    models = {

        "Linear Regression": {
            "model": lr_model,
            "r2": lr_r2,
            "mae": lr_mae,
            "rmse": lr_rmse
        },

        "Decision Tree": {
            "model": dt_model,
            "r2": dt_r2,
            "mae": dt_mae,
            "rmse": dt_rmse
        },

        "Random Forest": {
            "model": rf_model,
            "r2": rf_r2,
            "mae": rf_mae,
            "rmse": rf_rmse
        }

    }

    # ==========================
    # Select Best Model
    # ==========================

    best_model_name = max(
        models,
        key=lambda x: models[x]["r2"]
    )

    best_model = models[best_model_name]["model"]

    # ==========================
    # Save Model
    # ==========================

    os.makedirs("models", exist_ok=True)

    model_info = {

        "model": best_model,

        "algorithm": best_model_name,

        "target": target_column,

        "features": X.columns.tolist()

    }

    joblib.dump(
        model_info,
        "models/final_model.pkl"
    )

    # ==========================
    # Return Result
    # ==========================

    return {

        "Best Model": best_model_name,

        "R2 Score": models[best_model_name]["r2"],

        "MAE": models[best_model_name]["mae"],

        "RMSE": models[best_model_name]["rmse"],

        "Compared Models": {

            "Linear Regression": lr_r2,

            "Decision Tree": dt_r2,

            "Random Forest": rf_r2

        }

    }

# PART 4

# ==========================
# Run Directly
# ==========================

if __name__ == "__main__":

    file_path = "uploads/superstore_sales.csv"

    target_column = input("\nEnter Target Column : ")

    result = train_model(
        file_path,
        target_column
    )

    print("\n========== TRAINING RESULT ==========\n")

    for key, value in result.items():
        print(f"{key} : {value}")