import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";


import {
  FaChartBar,
  FaDatabase,
  FaColumns,
  FaLayerGroup,
  FaClone,
  FaMemory,
  FaSyncAlt,
} from "react-icons/fa";

function Analysis() {

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const loadAnalysis = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await axios.get(
        "http://127.0.0.1:5000/analysis"
      );

      if (res.data.success === false) {

        setError(res.data.message);

      } else {

        setAnalysis(res.data);

      }

    } catch (err) {

      setError("Unable to connect with Flask Server.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAnalysis();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold animate-pulse">

          Loading Analysis...

        </h1>

      </div>

    );

  }

  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-10">

          <h1 className="text-red-400 text-2xl font-bold">

            {error}

          </h1>

          <button

            onClick={loadAnalysis}

            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"

          >

            Retry

          </button>

        </div>

      </div>

    );

  }

  return (

  <main className="flex-1 p-8 min-h-screen">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-white">

              Dataset Analysis

            </h1>

            <p className="text-slate-400 mt-2">

              AI Business Intelligence Dataset Report

            </p>

          </div>

          <button

            onClick={loadAnalysis}

            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

          >

            <FaSyncAlt />

            Refresh

          </button>

        </div>

                {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition">

            <FaDatabase className="text-cyan-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Total Rows
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.rows.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition">

            <FaColumns className="text-green-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Total Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.columns.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-yellow-500 transition">

            <FaChartBar className="text-yellow-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Numeric Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.numeric_columns.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-pink-500 transition">

            <FaLayerGroup className="text-pink-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Categorical Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.categorical_columns.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-red-500 transition">

            <FaClone className="text-red-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Duplicate Rows
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.duplicate_rows.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500 transition">

            <FaMemory className="text-orange-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Memory Usage
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.memory_usage_kb} KB
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition">

            <FaDatabase className="text-indigo-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Missing Values
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {analysis.total_missing.toLocaleString()}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6">

            <h2 className="text-white text-xl font-bold">
              Dataset Health
            </h2>

            <p className="text-white/80 mt-3">

              {analysis.total_missing === 0
                ? "Excellent ✅"
                : "Needs Cleaning ⚠"}

            </p>

          </div>

        </div>

                {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Column Distribution
            </h2>

            <Plot
              data={[
                {
                  labels: ["Numeric", "Categorical"],
                  values: [
                    analysis.numeric_columns,
                    analysis.categorical_columns,
                  ],
                  type: "pie",
                  hole: 0.45,
                  textinfo: "label+percent",
                },
              ]}
              layout={{
                paper_bgcolor: "#0f172a",
                plot_bgcolor: "#0f172a",
                font: {
                  color: "white",
                },
                margin: {
                  t: 20,
                  l: 20,
                  r: 20,
                  b: 20,
                },
              }}
              config={{
                displayModeBar: false,
                responsive: true,
              }}
              style={{
                width: "100%",
                height: "380px",
              }}
            />

          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Missing Values
            </h2>

            <Plot
              data={[
                {
                  x: Object.keys(analysis.missing_values),
                  y: Object.values(analysis.missing_values),
                  type: "bar",
                },
              ]}
              layout={{
                paper_bgcolor: "#0f172a",
                plot_bgcolor: "#0f172a",
                font: {
                  color: "white",
                },
                margin: {
                  t: 20,
                  l: 50,
                  r: 20,
                  b: 120,
                },
                xaxis: {
                  tickangle: -35,
                },
              }}
              config={{
                displayModeBar: false,
                responsive: true,
              }}
              style={{
                width: "100%",
                height: "380px",
              }}
            />

          </div>

        </div>

        {/* AI Summary */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white">
            AI Dataset Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6 text-white">

            <div>

              <p>
                • Dataset contains <b>{analysis.rows.toLocaleString()}</b> rows.
              </p>

              <p className="mt-2">
                • Total <b>{analysis.columns}</b> columns detected.
              </p>

              <p className="mt-2">
                • Numeric Features : <b>{analysis.numeric_columns}</b>
              </p>

              <p className="mt-2">
                • Categorical Features : <b>{analysis.categorical_columns}</b>
              </p>

            </div>

            <div>

              <p>
                • Missing Values : <b>{analysis.total_missing}</b>
              </p>

              <p className="mt-2">
                • Duplicate Rows : <b>{analysis.duplicate_rows}</b>
              </p>

              <p className="mt-2">
                • Memory Usage : <b>{analysis.memory_usage_kb} KB</b>
              </p>

              <p className="mt-2">
                {analysis.total_missing === 0
                  ? "✅ Dataset is clean and ready for ML."
                  : "⚠ Dataset requires preprocessing before training."}
              </p>

            </div>

          </div>

        </div>

                {/* Tables */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

          {/* Column Names */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Column Names
            </h2>

            <div className="max-h-96 overflow-y-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-700">

                    <th className="text-left text-slate-300 py-3">
                      #
                    </th>

                    <th className="text-left text-slate-300 py-3">
                      Column Name
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {analysis.column_names.map((column, index) => (

                    <tr
                      key={column}
                      className="border-b border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="py-3 text-slate-400">
                        {index + 1}
                      </td>

                      <td className="py-3 text-white">
                        {column}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Data Types */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Data Types
            </h2>

            <div className="max-h-96 overflow-y-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-700">

                    <th className="text-left text-slate-300 py-3">
                      Column
                    </th>

                    <th className="text-left text-slate-300 py-3">
                      Type
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {Object.entries(analysis.data_types).map(

                    ([column, type]) => (

                      <tr
                        key={column}
                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                      >

                        <td className="py-3 text-white">
                          {column}
                        </td>

                        <td className="py-3">

                          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm">

                            {type}

                          </span>

                        </td>

                      </tr>

                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* Missing Values */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-10">

          <h2 className="text-white text-xl font-semibold mb-6">

            Missing Values

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="text-left py-3 text-slate-300">

                    Column

                  </th>

                  <th className="text-left py-3 text-slate-300">

                    Missing

                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(analysis.missing_values).map(

                  ([column, value]) => (

                    <tr
                      key={column}
                      className="border-b border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="py-3 text-white">

                        {column}

                      </td>

                      <td className="py-3">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            value === 0
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >

                          {value}

                        </span>

                      </td>

                    </tr>

                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

                {/* Summary Statistics */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-10">

          <h2 className="text-white text-xl font-semibold mb-6">
            Summary Statistics
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="py-3 text-left text-slate-300">
                    Column
                  </th>

                  <th className="py-3 text-left text-slate-300">
                    Mean
                  </th>

                  <th className="py-3 text-left text-slate-300">
                    Std
                  </th>

                  <th className="py-3 text-left text-slate-300">
                    Min
                  </th>

                  <th className="py-3 text-left text-slate-300">
                    Max
                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(analysis.summary).map(
                  ([column, stats]) => (

                    <tr
                      key={column}
                      className="border-b border-slate-800 hover:bg-slate-800 transition"
                    >

                      <td className="py-3 text-white font-medium">
                        {column}
                      </td>

                      <td className="py-3 text-slate-300">
                        {stats.mean !== "" ? Number(stats.mean).toFixed(2) : "-"}
                      </td>

                      <td className="py-3 text-slate-300">
                        {stats.std !== "" ? Number(stats.std).toFixed(2) : "-"}
                      </td>

                      <td className="py-3 text-slate-300">
                        {stats.min !== "" ? stats.min : "-"}
                      </td>

                      <td className="py-3 text-slate-300">
                        {stats.max !== "" ? stats.max : "-"}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

  );

}

export default Analysis;