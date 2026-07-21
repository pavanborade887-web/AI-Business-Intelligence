from src.data_loader import load_data
from pandas.api.types import is_numeric_dtype


def analyze_data(file_path):

    # ==========================
    # Load Dataset
    # ==========================

    df = load_data(file_path)

    # ==========================
    # Numeric Target Columns
    # ==========================

    numeric_target_columns = []

    for column in df.columns:

        if is_numeric_dtype(df[column]) and column != "Order_ID":

            numeric_target_columns.append(column)

    # ==========================
    # Numeric & Categorical Columns
    # ==========================

    numeric_columns = df.select_dtypes(include=["number"]).columns.tolist()

    categorical_columns = df.select_dtypes(exclude=["number"]).columns.tolist()

    # ==========================
    # Missing Values
    # ==========================

    missing_per_column = df.isnull().sum().to_dict()

    total_missing = int(df.isnull().sum().sum())

    # ==========================
    # Duplicate Rows
    # ==========================

    duplicate_rows = int(df.duplicated().sum())

    # ==========================
    # Memory Usage
    # ==========================

    memory_usage = round(
        df.memory_usage(deep=True).sum() / 1024,
        2
    )

    # ==========================
    # Dataset Summary
    # ==========================

    summary = df.describe(include="all").fillna("").to_dict()

    # ==========================
    # Final Analysis
    # ==========================

    analysis = {

        "rows": int(df.shape[0]),

        "columns": int(df.shape[1]),

        "column_names": df.columns.tolist(),

        "numeric_target_columns": numeric_target_columns,

        "data_types": {

            col: str(dtype)

            for col, dtype in df.dtypes.items()

        },

        "missing_values": missing_per_column,

        "total_missing": total_missing,

        "duplicate_rows": duplicate_rows,

        "numeric_columns": len(numeric_columns),

        "categorical_columns": len(categorical_columns),

        "memory_usage_kb": memory_usage,

        "summary": summary

    }

    return analysis


if __name__ == "__main__":

    result = analyze_data("uploads/superstore_sales.csv")

    from pprint import pprint

    pprint(result)