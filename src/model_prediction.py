import joblib
import pandas as pd
from data_loader import load_data

# save model loaded
sales_model = joblib.load("models/sales_model.pkl")

print("Model Loaded Successfully!")

# dataset load
df = load_data("data/raw/superstore_sales.csv")

df["Order_Date"] = pd.to_datetime(df["Order_Date"])

df["Year"] = df["Order_Date"].dt.year
df["Month"] = df["Order_Date"].dt.month
df["Day"] = df["Order_Date"].dt.day

df = pd.get_dummies(
    df,
    columns=["Region", "Category"],
    dtype=int
)

# features create
X = df.drop(
    columns=[
        "Sales",
        "Profit",
        "Order_ID",
        "Order_Date",
        "Customer",
        "Product"
    ]
)

# prediction on first 5 rows
predictions = sales_model.predict(X.head())

print(predictions)