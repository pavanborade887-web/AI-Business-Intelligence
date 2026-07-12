from data_loader import load_data

df = load_data("uploads/superstore_sales.csv")

print(df.head())

print("\nShape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())