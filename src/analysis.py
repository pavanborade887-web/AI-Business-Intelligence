import sys
print(sys.executable)

from data_loader import load_data

df = load_data("data/raw/superstore_sales.csv")

df.head()

df.tail()

df.shape

df.columns

df.info()

print("\nDataset Statistics:")
print(df.describe())

print(df.isnull().sum())

print(df.duplicated().sum())