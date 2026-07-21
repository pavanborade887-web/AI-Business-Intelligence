import { useEffect, useState } from "react";
import axios from "axios";


import {
  FaRobot,
  FaMagic,
  FaSyncAlt,
} from "react-icons/fa";

function Predict() {

  const [loading, setLoading] = useState(true);

  const [predicting, setPredicting] = useState(false);

  const [error, setError] = useState("");

  const [model, setModel] = useState(null);

  const [formData, setFormData] = useState({});

  const [prediction, setPrediction] = useState(null);

  const loadModel = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:5000/model-info"
      );

      setModel(res.data);

      const values = {};

      res.data.features.forEach((feature) => {

        values[feature] = "";

      });

      setFormData(values);

    } catch (err) {

      setError("Unable to load trained model.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadModel();

  }, []);

  const handleChange = (feature, value) => {

    setFormData({

      ...formData,

      [feature]: Number(value)

    });

  };

  const makePrediction = async () => {

    try {

      setPredicting(true);

      const res = await axios.post(

        "http://127.0.0.1:5000/predict",

        formData

      );

      setPrediction(res.data.prediction);

    } catch (err) {

      alert("Prediction Failed");

    } finally {

      setPredicting(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold animate-pulse">

          Loading Model...

        </h1>

      </div>

    );

  }

  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-red-400 text-2xl font-bold">

          {error}

        </h1>

      </div>

    );

  }

  return (

  <main className="flex-1 p-8 min-h-screen">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-white">

              AI Prediction

            </h1>

            <p className="text-slate-400 mt-2">

              Enter feature values and predict instantly.

            </p>

          </div>

          <button

            onClick={loadModel}

            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white flex items-center gap-2"

          >

            <FaSyncAlt />

            Refresh

          </button>

        </div>

                {/* Model Information */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Algorithm
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              {model.algorithm}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Target Column
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              {model.target}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Total Features
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              {model.features.length}
            </h2>

          </div>

        </div>

        {/* Prediction Form */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-white mb-8">

            Enter Feature Values

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {model.features.map((feature) => (

              <div key={feature}>

                <label className="block text-slate-300 mb-3">

                  {feature}

                </label>

                <input

                  type="number"

                  value={formData[feature]}

                  onChange={(e) =>
                    handleChange(feature, e.target.value)
                  }

                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"

                  placeholder={`Enter ${feature}`}

                />

              </div>

            ))}

          </div>

          <button

            onClick={makePrediction}

            disabled={predicting}

            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl py-4 text-white text-lg font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition disabled:opacity-50"

          >

            <FaMagic />

            {predicting ? "Predicting..." : "Predict"}

          </button>

        </div>

                {/* Prediction Result */}

        {prediction !== null && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold text-white mb-6">

              Prediction Result

            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8">

                <h3 className="text-white text-xl font-semibold">

                  Predicted {model.target}

                </h3>

                <h1 className="text-white text-5xl font-bold mt-6">

                  {typeof prediction === "number"
                    ? prediction.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : prediction}

                </h1>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <h3 className="text-white text-xl font-semibold mb-6">

                  Model Information

                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span className="text-slate-400">

                      Algorithm

                    </span>

                    <span className="text-white font-semibold">

                      {model.algorithm}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-400">

                      Target

                    </span>

                    <span className="text-white font-semibold">

                      {model.target}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-400">

                      Features Used

                    </span>

                    <span className="text-white font-semibold">

                      {model.features.length}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

                {/* AI Insights */}

        {prediction !== null && (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

            {/* Input Summary */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-white mb-6">

                Input Summary

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-slate-700">

                      <th className="text-left py-3 text-slate-300">

                        Feature

                      </th>

                      <th className="text-left py-3 text-slate-300">

                        Value

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {Object.entries(formData).map(([feature, value]) => (

                      <tr
                        key={feature}
                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                      >

                        <td className="py-3 text-white">

                          {feature}

                        </td>

                        <td className="py-3 text-cyan-400 font-semibold">

                          {value}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* AI Recommendation */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8">

              <FaRobot className="text-5xl text-white mb-6" />

              <h2 className="text-2xl font-bold text-white">

                AI Insight

              </h2>

              <div className="mt-6 space-y-4 text-white">

                <p>

                  ✅ Prediction completed successfully.

                </p>

                <p>

                  🤖 Model Used:

                  <strong>

                    {" "}

                    {model.algorithm}

                  </strong>

                </p>

                <p>

                  🎯 Target Column:

                  <strong>

                    {" "}

                    {model.target}

                  </strong>

                </p>

                <p>

                  📊 Features Analysed:

                  <strong>

                    {" "}

                    {model.features.length}

                  </strong>

                </p>

                <hr className="border-white/30" />

                <p>

                  This prediction is generated using the trained machine
                  learning model. Results depend on the quality and
                  distribution of the training dataset.

                </p>

              </div>

            </div>

          </div>

        )}

                {/* Success Banner */}

        {prediction !== null && (

          <div className="mt-10">

            <div className="bg-green-600/20 border border-green-500 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-green-400">

                🎉 Prediction Generated Successfully

              </h2>

              <p className="text-slate-300 mt-3">

                The prediction has been generated using your trained
                <strong> {model.algorithm}</strong> model.

              </p>

              <p className="text-slate-400 mt-2">

                You can change the feature values above and click
                <strong> Predict </strong>
                again to generate another prediction.

              </p>

            </div>

          </div>

        )}

      

    </main>

  );

}

export default Predict;