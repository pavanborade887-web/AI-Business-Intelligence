import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from data_loader import load_data

 # Bar Chart

def region_sales_chart(df):
    region_sales = df.groupby("Region")["Sales"].sum()

    print(region_sales)

    plt.figure(figsize=(8, 5))
    region_sales.plot(kind="bar")

    plt.title("Region Wise Sales")
    plt.xlabel("Region")
    plt.ylabel("Total Sales")

    plt.show()

# Pie Chart

def category_sales_chart(df):
    category_sales = df.groupby("Category")["Sales"].sum()

    plt.figure(figsize=(5, 5))

    plt.pie(
        category_sales,
        labels=category_sales.index,
        autopct="%1.1f%%",
        startangle=90
    )

    plt.title("Category Wise Sales Distribution")

    plt.show()

# Monthly sales chart [line chart]

def monthly_sales_chart(df):
    # Convert Order_Date to datetime (safety)
    df["Order_Date"] = pd.to_datetime(df["Order_Date"])

    # Create Month Name
    df["Month"] = df["Order_Date"].dt.month_name()

    # Total Sales by Month
    monthly_sales = df.groupby("Month")["Sales"].sum()
    month_order = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]
    
    monthly_sales = monthly_sales.reindex(month_order)

    print(monthly_sales)

    plt.figure(figsize=(10, 5))

    monthly_sales.plot(kind="line", marker="o")

    plt.title("Monthly Sales Trend")
    plt.xlabel("Month")
    plt.ylabel("Total Sales")
    plt.xticks(ticks=range(len(monthly_sales.index)),
           labels=monthly_sales.index,
           rotation=45)

    plt.grid(True)

    plt.show()

# Histogram

def sales_histogram(df):

    plt.figure(figsize=(8, 5))

    plt.hist(
        df["Sales"],
        bins=10,
        edgecolor="black"
    )

    plt.title("Sales Distribution")
    plt.xlabel("Sales")
    plt.ylabel("Frequency")

    plt.grid(True)

    plt.show()

# Scatter Plot

def sales_profit_scatter(df):

    plt.figure(figsize=(8, 5))

    plt.scatter(
        df["Sales"],
        df["Profit"],
        alpha=0.6
    )

    plt.title("Sales vs Profit")

    plt.xlabel("Sales")
    plt.ylabel("Profit")

    plt.grid(True)

    plt.show()

# Boxplot 

def sales_boxplot(df):

    plt.figure(figsize=(8, 5))

    plt.boxplot(
        df["Sales"],
        vert=True
    )

    plt.title("Sales Box Plot")

    plt.ylabel("Sales")

    plt.grid(True)

    plt.show()

# Correlation Heatmap

def correlation_heatmap(df):

    plt.figure(figsize=(12, 8))

    correlation = df.corr(numeric_only=True)

    sns.heatmap(
        correlation,
        annot=True,
        cmap="coolwarm",
        fmt=".2f"
    )

    plt.title("Correlation Heatmap")

    plt.show()
# Load Dataset
df = load_data("data/raw/superstore_sales.csv")

# Call Functions
region_sales_chart(df)
category_sales_chart(df)
monthly_sales_chart(df)
sales_histogram(df)
sales_profit_scatter(df)
sales_boxplot(df)
correlation_heatmap(df)