import pandas as pd


def feature_engineering(df):
    """
    Generic Feature Engineering for any dataset.
    """

    df = df.copy()

    # -----------------------------
    # Remove unnecessary ID columns
    # -----------------------------
    id_columns = []

    for col in df.columns:
        col_lower = col.lower()

        if (
            "id" in col_lower
            or "customer" in col_lower
            or "name" in col_lower
        ):
            id_columns.append(col)

    df.drop(columns=id_columns, inplace=True, errors="ignore")

    # -----------------------------
    # Convert Date Columns
    # -----------------------------
    for col in df.columns:

        if "date" in col.lower():

            try:

                df[col] = pd.to_datetime(df[col])

                df[col + "_Year"] = df[col].dt.year
                df[col + "_Month"] = df[col].dt.month
                df[col + "_Day"] = df[col].dt.day

                df.drop(columns=col, inplace=True)

            except Exception:
                pass

    # -----------------------------
    # Encode Categorical Columns
    # -----------------------------
    categorical_columns = df.select_dtypes(
        include=["object", "string", "category"]
    ).columns

    df = pd.get_dummies(
        df,
        columns=categorical_columns,
        drop_first=True,
        dtype=int
    )

    return df


if __name__ == "__main__":

    from data_loader import load_data

    df = load_data("uploads/superstore_sales.csv")

    engineered_df = feature_engineering(df)

    print(engineered_df.head())

    print("\nShape :", engineered_df.shape)

    print("\nColumns :")
    print(engineered_df.columns.tolist())
