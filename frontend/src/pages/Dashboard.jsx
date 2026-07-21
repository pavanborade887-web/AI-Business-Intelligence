import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

import {
  FaDatabase,
  FaTable,
  FaBullseye,
  FaBrain,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    dataset_name: "No Dataset",
    rows: 0,
    columns: 0,
    target: "-",
    best_model: "-",
    training_status: "Not Trained",
  });

  const [charts, setCharts] = useState({
    histogram: null,
    pie: null,
    bar: null,
    heatmap: null,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const datasetRes = await axios.get(
        "http://127.0.0.1:5000/dataset-info"
      );

      if (datasetRes.data.success) {
        setData(datasetRes.data);
      } else {
        setError(datasetRes.data.message);
      }

      try {
        const chartRes = await axios.get(
          "http://127.0.0.1:5000/charts"
        );

        if (chartRes.data.success) {
          setCharts(chartRes.data.charts);
        }
      } catch (err) {
        console.log("Charts not available.");
      }

    } catch (err) {

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to Flask server.");
      }

    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Rows",
      value: Number(data.rows).toLocaleString(),
      icon: <FaDatabase />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Columns",
      value: Number(data.columns).toLocaleString(),
      icon: <FaTable />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Target",
      value: data.target,
      icon: <FaBullseye />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Best Model",
      value: data.best_model,
      icon: <FaBrain />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <main className="flex-1 p-8 bg-slate-950 text-white min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            AI Business Intelligence Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time Dataset Analytics & Machine Learning Overview
          </p>

        </div>

        <button
          onClick={loadDashboard}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">

          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-5"></div>

          <p>Loading Dashboard...</p>

        </div>

      )}

      {/* Error */}

      {!loading && error && (

        <div className="bg-red-900/20 border border-red-500 rounded-xl p-5">
          {error}
        </div>

      )}

      {!loading && !error && (

        <>

          {/* Current Dataset */}

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">

            <h2 className="text-xl font-semibold mb-3">
              Current Dataset
            </h2>

            <h3
              className="text-2xl font-bold truncate text-blue-400"
              title={data.dataset_name}
            >
              {data.dataset_name}
            </h3>

            <div className="flex items-center gap-2 mt-5">

              <FaCheckCircle className="text-green-400" />

              <span className="text-green-400 font-medium">
                {data.training_status}
              </span>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl mb-4`}
                >
                  {card.icon}
                </div>

                <p className="text-slate-400">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 break-words">
                  {card.value}
                </h2>

              </div>

            ))}

          </div>

          {/* ===== PART 2 STARTS FROM HERE ===== */}

          {/* ================= Charts ================= */}

<div className="grid lg:grid-cols-2 gap-6 mt-8">

  {/* Histogram */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Histogram
    </h2>

    {charts.histogram ? (

      <Plot
        data={[
          {
            x: charts.histogram.x,
            type: "histogram",
          },
        ]}
        layout={{
          title: charts.histogram.title,
          paper_bgcolor: "#0f172a",
          plot_bgcolor: "#0f172a",
          font: { color: "white" },
          autosize: true,
        }}
        style={{ width: "100%", height: "350px" }}
        useResizeHandler
      />

    ) : (

      <p className="text-slate-400">
        Histogram unavailable
      </p>

    )}

  </div>

  {/* Pie Chart */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Pie Chart
    </h2>

    {charts.pie ? (

      <Plot
        data={[
          {
            labels: charts.pie.labels,
            values: charts.pie.values,
            type: "pie",
          },
        ]}
        layout={{
          title: charts.pie.title,
          paper_bgcolor: "#0f172a",
          plot_bgcolor: "#0f172a",
          font: { color: "white" },
          autosize: true,
        }}
        style={{ width: "100%", height: "350px" }}
        useResizeHandler
      />

    ) : (

      <p className="text-slate-400">
        Pie chart unavailable
      </p>

    )}

  </div>

</div>

{/* ================= Bar + Heatmap ================= */}

<div className="grid lg:grid-cols-2 gap-6 mt-8">

  {/* Bar Chart */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Bar Chart
    </h2>

    {charts.bar ? (

      <Plot
        data={[
          {
            x: charts.bar.labels,
            y: charts.bar.values,
            type: "bar",
          },
        ]}
        layout={{
          title: charts.bar.title,
          paper_bgcolor: "#0f172a",
          plot_bgcolor: "#0f172a",
          font: { color: "white" },
          autosize: true,
        }}
        style={{ width: "100%", height: "350px" }}
        useResizeHandler
      />

    ) : (

      <p className="text-slate-400">
        Bar chart unavailable
      </p>

    )}

  </div>

    {/* Heatmap */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Correlation Heatmap
    </h2>

    {charts.heatmap ? (

      <Plot
        data={[
          {
            z: charts.heatmap.z,
            x: charts.heatmap.x,
            y: charts.heatmap.y,
            type: "heatmap",
          },
        ]}
        layout={{
          paper_bgcolor: "#0f172a",
          plot_bgcolor: "#0f172a",
          font: { color: "white" },
          autosize: true,
        }}
        style={{ width: "100%", height: "350px" }}
        useResizeHandler
      />

    ) : (

      <p className="text-slate-400">
        Heatmap unavailable
      </p>

    )}

  </div>

</div>

{/* ================= Summary + Quick Actions ================= */}

<div className="grid lg:grid-cols-2 gap-6 mt-8">

  {/* Dataset Summary */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Dataset Summary
    </h2>

    <div className="space-y-3">

      <div className="flex justify-between">
        <span className="text-slate-400">Dataset</span>
        <span className="truncate max-w-56" title={data.dataset_name}>
          {data.dataset_name}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Rows</span>
        <span>{Number(data.rows).toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Columns</span>
        <span>{Number(data.columns).toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Target</span>
        <span>{data.target}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Best Model</span>
        <span>{data.best_model}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Training Status</span>
        <span className="text-green-400">
          {data.training_status}
        </span>
      </div>

    </div>

  </div>

  {/* Quick Actions */}

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

    <h2 className="text-xl font-semibold mb-4">
      Quick Actions
    </h2>

    <div className="grid grid-cols-2 gap-4">

      {[
        "Upload Dataset",
        "Preview",
        "Analysis",
        "Train Model",
        "Predict",
        "Reports",
      ].map((item) => (

        <button
          key={item}
          className="bg-slate-800 hover:bg-blue-600 rounded-xl p-4 transition"
        >
          {item}
        </button>

      ))}

    </div>

  </div>

</div>

        </>
      )}

    </main>
  );
}

export default Dashboard;