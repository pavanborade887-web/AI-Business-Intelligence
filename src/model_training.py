import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

from data_loader import load_data

df = load_data("data/raw/superstore_sales.csv")

#  Date Features
df["Order_Date"] = pd.to_datetime(df["Order_Date"])

df["Year"] = df["Order_Date"].dt.year
df["Month"] = df["Order_Date"].dt.month
df["Day"] = df["Order_Date"].dt.day

# One-Hot Encoding
df = pd.get_dummies(
    df,
    columns=["Region", "Category"],
    dtype=int
)

# Sales Prediction Dataset
X_sales = df.drop(
    columns=[
        "Sales",
        "Profit",
        "Order_ID",
        "Order_Date",
        "Customer",
        "Product"
    ]
)

y_sales = df["Sales"]

# Train-Test split
X_train, X_test, y_train, y_test = train_test_split(
    X_sales,
    y_sales,
    test_size=0.2,
    random_state=42
)

# model create
sales_model = LinearRegression()

# Train model
sales_model.fit(X_train, y_train)

# Model Save
joblib.dump(sales_model, "models/sales_model.pkl")
print("Sales Model Saved Successfully!")

# prediction
predictions = sales_model.predict(X_test)

print("predicted sales")
print(predictions[:10])           #first 10 predicted sales

# Import Metrics
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)


# matrices find
r2 = r2_score(y_test, predictions)

mae = mean_absolute_error(y_test, predictions)

mse = mean_squared_error(y_test, predictions)

rmse = mse ** 0.5

print("R2 Score :", r2)
print("MAE      :", mae)
print("MSE      :", mse)
print("RMSE     :", rmse)

# print shapes
print("Training Features :", X_train.shape)
print("Testing Features  :", X_test.shape)

print("Training Target   :", y_train.shape)
print("Testing Target    :", y_test.shape)