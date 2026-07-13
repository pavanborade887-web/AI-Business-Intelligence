import matplotlib.pyplot as plt
import pandas as pd

from src.data_loader import load_data


def visualize_data(df):
    # Numeric Columns
    numeric_columns = df.select_dtypes(include="number").columns

    # Categorical Columns
    categorical_columns = df.select_dtypes(include="object").columns

    # -----------------------------
    # Histograms
    # -----------------------------
    for col in numeric_columns:
        plt.figure(figsize=(8, 5))
        plt.hist(df[col].dropna(), bins=20)
        plt.title(f"Histogram - {col}")
        plt.xlabel(col)
        plt.ylabel("Frequency")
        plt.show()

    # -----------------------------
    # Boxplots
    # -----------------------------
    for col in numeric_columns:
        plt.figure(figsize=(8, 5))
        plt.boxplot(df[col].dropna())
        plt.title(f"Box Plot - {col}")
        plt.ylabel(col)
        plt.show()

    # -----------------------------
    # Bar Charts
    # -----------------------------
    for col in categorical_columns:

        if df[col].nunique() <= 15:

            plt.figure(figsize=(8, 5))

            df[col].value_counts().plot(kind="bar")

            plt.title(f"Bar Chart - {col}")
            plt.xlabel(col)
            plt.ylabel("Count")

            plt.show()


if __name__ == "__main__":

    df = load_data("uploads/superstore_sales.csv")

    visualize_data(df)