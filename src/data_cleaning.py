import pandas as pd
from data_loader import load_data

# Load Dataset
df = load_data("data/raw/superstore_sales.csv")

# Convert Order_Date to datetime
df["Order_Date"] = pd.to_datetime(df["Order_Date"])

print("========== DATA CLEANING ==========\n")

print("Missing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:")
print(df.duplicated().sum())

print("\nDataset Information:")
df.info()

# Create New Features from Date

df["Year"] = df["Order_Date"].dt.year
df["Month"] = df["Order_Date"].dt.month
df["Day"] = df["Order_Date"].dt.day

print("\nFirst 5 Rows After Feature Creation:")
print(df.head())