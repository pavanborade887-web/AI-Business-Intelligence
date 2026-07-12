import joblib

model_info = joblib.load("models/final_model.pkl")

print(model_info.keys())

print("\nAlgorithm :", model_info["algorithm"])
print("Target    :", model_info["target"])
print("Features  :", len(model_info["features"]))