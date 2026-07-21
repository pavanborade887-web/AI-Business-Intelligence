import pandas as pd


def get_chart_data(file_path):

    df = pd.read_csv(file_path)

    charts = {}

    # ---------------- Numeric Columns ----------------

    numeric = df.select_dtypes(include="number")

    # ---------------- Histogram ----------------

    if len(numeric.columns):

        hist_col = numeric.columns[0]

        charts["histogram"] = {
            "x": numeric[hist_col].dropna().tolist(),
            "title": f"{hist_col} Distribution"
        }

    # ---------------- Heatmap ----------------

    if len(numeric.columns) >= 2:

        corr = numeric.corr().round(2)

        charts["heatmap"] = {
            "x": corr.columns.tolist(),
            "y": corr.index.tolist(),
            "z": corr.values.tolist()
        }

    # ---------------- Pie Chart ----------------

    pie_column = None

    # First Preference → Object/Text column
    for col in df.columns:

        if df[col].dtype == "object" and df[col].nunique() <= 10:
            pie_column = col
            break

    # Second Preference → Numeric column having <=10 unique values
    if pie_column is None:

        for col in numeric.columns:

            if df[col].nunique() <= 10:
                pie_column = col
                break

    if pie_column:

        counts = df[pie_column].value_counts()

        charts["pie"] = {
            "labels": [str(x) for x in counts.index.tolist()],
            "values": counts.values.tolist(),
            "title": f"{pie_column} Distribution"
        }

    # ---------------- Bar Chart ----------------

    bar_column = None

    # First Preference → Object/Text column
    for col in df.columns:

        if df[col].dtype == "object":
            bar_column = col
            break

    # Second Preference → Numeric column having <=10 unique values
    if bar_column is None:

        for col in numeric.columns:

            if df[col].nunique() <= 10:
                bar_column = col
                break

    if bar_column:

        counts = df[bar_column].value_counts().head(10)

        charts["bar"] = {
            "labels": [str(x) for x in counts.index.tolist()],
            "values": counts.values.tolist(),
            "title": f"{bar_column} Distribution"
        }

    return charts