import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import os
from src.data_loader import load_data
from src.model_prediction import predict
from src.model_training import train_model
from src.analysis import analyze_data

app = Flask(__name__)
CURRENT_FILE = None

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Enable CORS
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "project": "AI Business Intelligence Platform",
        "version": "1.0",
        "status": "Running"
    })

@app.route("/upload", methods=["POST"])
def upload_file():
    
    print("UPLOAD API CALLED")
    print(request.content_type)
    print(request.files)

    if "file" not in request.files:
        return jsonify({
            "success": False,
            "message": "No file uploaded."
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "No file selected."
        }), 400

    file_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(file_path)
    global CURRENT_FILE
    CURRENT_FILE = file_path
    
    return jsonify({
        "success": True,
        "message": "File uploaded successfully.",
        "filename": file.filename,
        "path": file_path
    }), 200

@app.route("/analysis", methods=["GET"])
def analysis():

    global CURRENT_FILE

    if CURRENT_FILE is None:
        return jsonify({
            "success": False,
            "message": "No dataset uploaded."
        }), 400

    result = analyze_data(CURRENT_FILE)

    return jsonify(result)


@app.route("/train", methods=["POST"])
def train():

    global CURRENT_FILE

    if CURRENT_FILE is None:
        return jsonify({
            "success": False,
            "message": "No dataset uploaded."
        }), 400

    data = request.get_json()

    target = data.get("target")

    if not target:
        return jsonify({
            "success": False,
            "message": "Target column is required."
        }), 400

    result = train_model(
        CURRENT_FILE,
        target
    )

    return jsonify({
        "success": True,
        "result": result
    })

@app.route("/predict", methods=["GET"])
def prediction():

    global CURRENT_FILE

    if CURRENT_FILE is None:
        return jsonify({
            "success": False,
            "message": "No dataset uploaded."
        }), 400

    predictions = predict(CURRENT_FILE)

    return jsonify({
    "success": True,
    "total_predictions": len(predictions),

    "sample_predictions": predictions[:10],

    "statistics": {
        "min_prediction": round(min(predictions), 2),
        "max_prediction": round(max(predictions), 2),
        "average_prediction": round(
            sum(predictions) / len(predictions),
            2
        )
    }
})


@app.route("/dataset-info", methods=["GET"])
def dataset_info():

    global CURRENT_FILE

    if CURRENT_FILE is None:
        return jsonify({
            "success": False,
            "message": "No dataset uploaded."
        }), 400

    analysis = analyze_data(CURRENT_FILE)

    model_path = "models/final_model.pkl"

    model_status = "Not Trained"
    target = None
    best_model = None

    if os.path.exists(model_path):

        model_info = joblib.load(model_path)

        model_status = "Trained"

        target = model_info["target"]

        best_model = model_info["algorithm"]

    return jsonify({

        "success": True,

        "dataset_name": os.path.basename(CURRENT_FILE),

        "rows": analysis["rows"],

        "columns": analysis["columns"],

        "target": target,

        "best_model": best_model,

        "training_status": model_status

    })

@app.route("/preview", methods=["GET"])
def preview():

    global CURRENT_FILE

    if CURRENT_FILE is None:
        return jsonify({
            "success": False,
            "message": "No dataset uploaded."
        }), 400

    df = load_data(CURRENT_FILE)

    preview_data = df.head(10)

    return jsonify({
        "success": True,
        "total_rows": len(df),
        "preview": preview_data.to_dict(orient="records")
    })

if __name__ == "__main__":
    app.run(debug=True)