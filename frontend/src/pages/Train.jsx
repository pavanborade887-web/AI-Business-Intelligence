import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";


import {
  FaBrain,
  FaPlay,
  FaSyncAlt,
} from "react-icons/fa";

function Train() {

  const [loading, setLoading] = useState(true);

  const [training, setTraining] = useState(false);

  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const [target, setTarget] = useState("");

  const [result, setResult] = useState(null);

  const loadDataset = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:5000/analysis"
      );

      setAnalysis(res.data);

      if (res.data.column_names.length > 0) {

        setTarget(res.data.column_names[0]);

      }

    } catch (err) {

      setError("Unable to connect with Flask.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDataset();

  }, []);

  const trainModel = async () => {

    try {

      setTraining(true);

      const res = await axios.post(

        "http://127.0.0.1:5000/train",

        {

          target: target,

        }

      );

      setResult(res.data.result);

    } catch (err) {

      alert("Training Failed");

    } finally {

      setTraining(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold animate-pulse">

          Loading...

        </h1>

      </div>

    );

  }

  return (

  <main className="flex-1 p-8 min-h-screen">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-white">

              Train AI Model

            </h1>

            <p className="text-slate-400 mt-2">

              Select Target Column & Train Machine Learning Model

            </p>

          </div>

          <button

            onClick={loadDataset}

            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

          >

            <FaSyncAlt />

            Refresh

          </button>

        </div>

                {/* Dataset Information */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Total Rows
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.rows.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Total Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.columns.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Numeric Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.numeric_columns.toLocaleString()}
            </h2>

          </div>

        </div>

        {/* Training Panel */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-white mb-6">

            Model Configuration

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block text-slate-300 mb-3">

                Select Target Column

              </label>

              <select

                value={target}

                onChange={(e) => setTarget(e.target.value)}

                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500"

              >

                {analysis.numeric_target_columns.map((column) => (

                  <option
                    key={column}
                    value={column}
                  >
                    {column}
                  </option>

                ))}

              </select>

            </div>

            <div className="flex items-end">

              <button

                onClick={trainModel}

                disabled={training}

                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition duration-300 rounded-xl py-4 text-white font-semibold flex justify-center items-center gap-3 disabled:opacity-50"

              >

                <FaPlay />

                {training ? "Training Model..." : "Train Model"}

              </button>

            </div>

          </div>

        </div>

                {/* Training Result */}

        {result && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold text-white mb-6">

              Training Result

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <FaBrain className="text-cyan-400 text-3xl mb-4" />

                <p className="text-slate-400">

                  Best Model

                </p>

                <h2 className="text-2xl font-bold text-white mt-2">

                  {result["Best Model"]}

                </h2>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  R² Score

                </p>

                <h2 className="text-3xl font-bold text-green-400 mt-2">

                  {Number(result["R2 Score"]).toFixed(4)}

                </h2>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  MAE

                </p>

                <h2 className="text-3xl font-bold text-yellow-400 mt-2">

                  {Number(result["MAE"]).toFixed(2)}

                </h2>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                <p className="text-slate-400">

                  RMSE

                </p>

                <h2 className="text-3xl font-bold text-red-400 mt-2">

                  {Number(result["RMSE"]).toFixed(2)}

                </h2>

              </div>

            </div>

          </div>

        )}

                {/* Model Comparison */}

        {result && (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-white mb-6">

                Model Comparison

              </h2>

              <Plot

                data={[

                  {

                    x: Object.keys(result["Compared Models"]),

                    y: Object.values(result["Compared Models"]),

                    type: "bar",

                    text: Object.values(result["Compared Models"]).map(

                      (v) => Number(v).toFixed(4)

                    ),

                    textposition: "outside",

                  },

                ]}

                layout={{

                  paper_bgcolor: "#0f172a",

                  plot_bgcolor: "#0f172a",

                  font: {

                    color: "white",

                  },

                  margin: {

                    t: 30,

                    l: 50,

                    r: 20,

                    b: 60,

                  },

                }}

                config={{

                  displayModeBar: false,

                  responsive: true,

                }}

                style={{

                  width: "100%",

                  height: "400px",

                }}

              />

            </div>

            {/* AI Recommendation */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white">

                AI Recommendation

              </h2>

              <div className="mt-6 space-y-4 text-white">

                <p>

                  ✅ <strong>Best Model:</strong>

                  {" "}

                  {result["Best Model"]}

                </p>

                <p>

                  📈 <strong>R² Score:</strong>

                  {" "}

                  {Number(result["R2 Score"]).toFixed(4)}

                </p>

                <p>

                  📉 <strong>MAE:</strong>

                  {" "}

                  {Number(result["MAE"]).toFixed(2)}

                </p>

                <p>

                  📊 <strong>RMSE:</strong>

                  {" "}

                  {Number(result["RMSE"]).toFixed(2)}

                </p>

                <hr className="border-white/30 my-4" />

                <p>

                  🤖 Based on the evaluation metrics,

                  <strong> {result["Best Model"]}</strong>

                  {" "}achieved the highest R² score and is recommended

                  for future predictions on this dataset.

                </p>

              </div>

            </div>

          </div>

        )}

                {/* Success Message */}

        {result && (

          <div className="mt-10">

            <div className="bg-green-600/20 border border-green-500 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-green-400">

                🎉 Model Training Completed Successfully

              </h2>

              <p className="text-slate-300 mt-3">

                Your machine learning model has been trained successfully and
                saved as <strong>models/final_model.pkl</strong>.

              </p>

              <p className="text-slate-400 mt-2">

                You can now move to the <strong>Predict</strong> page to make
                predictions using the trained model.

              </p>

            </div>

          </div>

        )}

         </main>

  );

}

export default Train;