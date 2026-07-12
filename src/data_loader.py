import pandas as pd


def load_data(file_path):
    """
    Load dataset based on file extension.
    Supported formats:
    - CSV
    - Excel (.xlsx)
    - JSON
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith(".xlsx"):
        df = pd.read_excel(file_path)

    elif file_path.endswith(".json"):
        df = pd.read_json(file_path)

    else:
        raise ValueError(
            "Unsupported file format. Please upload CSV, Excel, or JSON file."
        )

    return df