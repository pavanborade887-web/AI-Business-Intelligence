import numpy as np
import pandas as pd

def load_data(file_path):
    df = pd.read_csv("data/raw/superstore_sales.csv")
    return df
