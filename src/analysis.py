from data_loader import load_data


def analyze_data(df):
    print("\n========== DATASET OVERVIEW ==========")

    print(f"\nRows    : {df.shape[0]}")
    print(f"Columns : {df.shape[1]}")

    print("\n========== COLUMN NAMES ==========")
    print(df.columns.tolist())

    print("\n========== DATA TYPES ==========")
    print(df.dtypes)

    print("\n========== MISSING VALUES ==========")
    print(df.isnull().sum())

    print("\n========== DUPLICATE ROWS ==========")
    print(df.duplicated().sum())

    print("\n========== SUMMARY STATISTICS ==========")
    print(df.describe(include="all"))


if __name__ == "__main__":
    df = load_data("uploads/superstore_sales.csv")
    analyze_data(df)