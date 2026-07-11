import pandas as pd
from data_loader import load_data


df = load_data("data/raw/superstore_sales.csv")

# Convert Date Column
df["Order_Date"] = pd.to_datetime(df["Order_Date"])

# Create New Features
df["Year"] = df["Order_Date"].dt.year
df["Month"] = df["Order_Date"].dt.month
df["Day"] = df["Order_Date"].dt.day

# One-Hot Encoding
df = pd.get_dummies(
    df,
    columns=["Region", "Category"],
    dtype=int
)

# features drop
X = df.drop(
    columns= [
        "Sales",
        "Order_ID",
        "Order_Date",
        "Customer",
        "Product"
        ]
)

# Target (y)
y = df["Sales"]

print("Features Shape:", X.shape)
print("Target Shape:", y.shape)

print("\nFeature Columns:")
print(X.columns)

print(df.head())
print(df.columns)
