from data_loader import load_data
from feature_engineering import feature_engineering

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error,
)

import joblib


# ==============================
# Load Dataset
# ==============================

df = load_data("uploads/superstore_sales.csv")

# ==============================
# Feature Engineering
# ==============================

df = feature_engineering(df)

print("\n========== DATASET ==========")
print(df.head())

# ==============================
# Show Numeric Columns
# ==============================

numeric_columns = df.select_dtypes(include="number").columns.tolist()

print("\n========== NUMERIC COLUMNS ==========")

for i, col in enumerate(numeric_columns, start=1):
    print(f"{i}. {col}")

# ==============================
# User Select Target
# ==============================

target_column = input("\nEnter Target Column: ")

if target_column not in df.columns:
    raise ValueError(f"{target_column} not found in dataset.")

# ==============================
# Features & Target
# ==============================

X = df.drop(columns=[target_column])
y = df[target_column]

print("\n========== FEATURES ==========")
print(X.head())

print("\n========== TARGET ==========")
print(y.head())

print("\nFeature Shape :", X.shape)
print("Target Shape  :", y.shape)

# ==============================
# Train Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\n========== TRAIN TEST SPLIT ==========")
print("Training Features :", X_train.shape)
print("Testing Features  :", X_test.shape)
print("Training Target   :", y_train.shape)
print("Testing Target    :", y_test.shape)

# ==============================
# Linear Regression
# ==============================

lr_model = LinearRegression()

lr_model.fit(X_train, y_train)

lr_predictions = lr_model.predict(X_test)

print("\n========== LINEAR REGRESSION ==========")

lr_r2 = r2_score(y_test, lr_predictions)

print("R2 Score :", lr_r2)
print("MAE      :", mean_absolute_error(y_test, lr_predictions))
print("RMSE     :", mean_squared_error(y_test, lr_predictions) ** 0.5)

# ==============================
# Random Forest
# ==============================

rf_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

rf_model.fit(X_train, y_train)

rf_predictions = rf_model.predict(X_test)

print("\n========== RANDOM FOREST ==========")

rf_r2 = r2_score(y_test, rf_predictions)

print("R2 Score :", rf_r2)
print("MAE      :", mean_absolute_error(y_test, rf_predictions))
print("RMSE     :", mean_squared_error(y_test, rf_predictions) ** 0.5)

# ==============================
# Select Best Model
# ==============================

if rf_r2 > lr_r2:
    best_model = rf_model
    best_model_name = "Random Forest"
else:
    best_model = lr_model
    best_model_name = "Linear Regression"

joblib.dump(best_model, "models/final_model.pkl")

print("\n========== FINAL MODEL ==========")
print("Best Model :", best_model_name)
print("Model Saved Successfully!")
