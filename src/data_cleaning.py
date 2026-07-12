from data_loader import load_data


def clean_data(df):
    print("\n========== DATA CLEANING ==========")

    # Remove Duplicate Rows
    duplicate_count = df.duplicated().sum()

    if duplicate_count > 0:
        df = df.drop_duplicates()
        print(f"Removed {duplicate_count} duplicate rows.")
    else:
        print("No duplicate rows found.")

    # Handle Missing Values
    numeric_columns = df.select_dtypes(include=["number"]).columns

    categorical_columns = df.select_dtypes(include=["object"]).columns

    # Fill numeric columns with median
    for col in numeric_columns:
        df[col] = df[col].fillna(df[col].median())

    # Fill categorical columns with mode
    for col in categorical_columns:
        df[col] = df[col].fillna(df[col].mode()[0])

    print("\nMissing Values After Cleaning:")
    print(df.isnull().sum())

    return df


if __name__ == "__main__":
    df = load_data("uploads/superstore_sales.csv")

    cleaned_df = clean_data(df)

    print("\n========== CLEANED DATA ==========")
    print(cleaned_df.head())