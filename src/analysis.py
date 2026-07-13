from src.data_loader import load_data


def analyze_data(file_path):

    df = load_data(file_path)

    analysis = {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "column_names": df.columns.tolist(),
        "data_types": df.dtypes.astype(str).to_dict(),
        "missing_values": df.isnull().sum().to_dict(),
        "duplicate_rows": int(df.duplicated().sum())
    }

    return analysis


if __name__ == "__main__":

    result = analyze_data("uploads/superstore_sales.csv")

    print("\n========== DATASET ANALYSIS ==========\n")

    for key, value in result.items():
        print(f"{key} :")
        print(value)
        print()