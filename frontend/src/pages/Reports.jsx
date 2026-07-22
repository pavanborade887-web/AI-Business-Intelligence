import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaDatabase,
  FaBrain,
  FaChartBar,
  FaDownload,
  FaFilePdf,
  FaFileCsv,
  FaCheckCircle,
} from "react-icons/fa";

function Reports() {
  const [datasetInfo, setDatasetInfo] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [modelInfo, setModelInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const dataset = await axios.get(
        "http://127.0.0.1:5000/dataset-info"
      );

      const analysisData = await axios.get(
        "http://127.0.0.1:5000/analysis"
      );

      const model = await axios.get(
        "http://127.0.0.1:5000/model-info"
      );

      setDatasetInfo(dataset.data);
      setAnalysis(analysisData.data);
      setModelInfo(model.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex justify-center items-center min-h-screen bg-slate-950">
        <h2 className="text-2xl text-cyan-400 animate-pulse">
          Loading Reports...
        </h2>
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen overflow-y-auto bg-slate-950 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Reports Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              AI Business Intelligence Report Summary
            </p>
          </div>

          <div className="flex gap-3">

            <button
  onClick={downloadReport}
  className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white transition"
>
  <FaFilePdf />
  Download PDF
</button>

            <button
              className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white transition"
            >
              <FaFileCsv />
              Download CSV
            </button>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* Dataset Summary */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <FaDatabase className="text-cyan-400 text-3xl" />
            <h2 className="text-xl font-semibold text-white">
              Dataset Summary
            </h2>
          </div>

          <div className="space-y-3 text-slate-300">

            <p>
              <span className="font-semibold text-white">Dataset :</span>{" "}
              {datasetInfo.dataset_name || "N/A"}
            </p>

            <p>
              <span className="font-semibold text-white">Rows :</span>{" "}
              {datasetInfo.rows?.toLocaleString() || 0}
            </p>

            <p>
              <span className="font-semibold text-white">Columns :</span>{" "}
              {datasetInfo.columns || 0}
            </p>

            <p>
              <span className="font-semibold text-white">Target :</span>{" "}
              {datasetInfo.target || "Not Selected"}
            </p>

          </div>

        </div>

        {/* Model Summary */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <FaBrain className="text-violet-400 text-3xl" />
            <h2 className="text-xl font-semibold text-white">
              Model Summary
            </h2>
          </div>

          <div className="space-y-3 text-slate-300">

            <p>
              <span className="font-semibold text-white">Algorithm :</span>{" "}
              {modelInfo.algorithm || "N/A"}
            </p>

            <p>
              <span className="font-semibold text-white">Target :</span>{" "}
              {modelInfo.target || "N/A"}
            </p>

            <p>
              <span className="font-semibold text-white">Features :</span>{" "}
              {modelInfo.features?.length || 0}
            </p>

            <p className="flex items-center gap-2 text-green-400">
              <FaCheckCircle />
              Model Trained Successfully
            </p>

          </div>

        </div>

        {/* Analysis Summary */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <FaChartBar className="text-pink-400 text-3xl" />
            <h2 className="text-xl font-semibold text-white">
              Analysis Summary
            </h2>
          </div>

          <div className="space-y-3 text-slate-300">

            <p>
              <span className="font-semibold text-white">Missing Values :</span>{" "}
              {analysis.total_missing}
            </p>

            <p>
              <span className="font-semibold text-white">Duplicate Rows :</span>{" "}
              {analysis.duplicate_rows || 0}
            </p>

            <p>
              <span className="font-semibold text-white">Numeric Columns :</span>{" "}
              {analysis.numeric_columns || 0}
            </p>

            <p>
              <span className="font-semibold text-white">Categorical Columns :</span>{" "}
              {analysis.categorical_columns || 0}
            </p>

          </div>

        </div>

        {/* Prediction Summary */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <FaDownload className="text-green-400 text-3xl" />
            <h2 className="text-xl font-semibold text-white">
              Prediction Summary
            </h2>
          </div>

          <div className="space-y-3 text-slate-300">

            <p>
              <span className="font-semibold text-white">
                Last Prediction :
              </span>{" "}
              Available
            </p>

            <p>
              <span className="font-semibold text-white">
                Status :
              </span>{" "}
              Ready
            </p>

            <p className="text-green-400">
              Prediction Module Working Successfully
            </p>

          </div>

        </div>

      </div>

      {/* Detailed Report */}

      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Dataset Information */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-5">
            Dataset Information
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <tbody className="text-slate-300">

                <tr className="border-b border-slate-800">
                  <td className="py-3 font-semibold text-white">
                    Dataset Name
                  </td>
                  <td>{datasetInfo.dataset_name || "N/A"}</td>
                </tr>

                <tr className="border-b border-slate-800">
                  <td className="py-3 font-semibold text-white">
                    Total Rows
                  </td>
                  <td>{datasetInfo.rows || 0}</td>
                </tr>

                <tr className="border-b border-slate-800">
                  <td className="py-3 font-semibold text-white">
                    Total Columns
                  </td>
                  <td>{datasetInfo.columns || 0}</td>
                </tr>

                <tr className="border-b border-slate-800">
                  <td className="py-3 font-semibold text-white">
                    Target Column
                  </td>
                  <td>{datasetInfo.target || "Not Selected"}</td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold text-white">
                    Training Status
                  </td>
                  <td className="text-green-400">
                    {datasetInfo.training_status || "Completed"}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Analysis Information */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-5">
            Analysis Information
          </h2>

          <div className="space-y-4 text-slate-300">

            <div className="flex justify-between">
              <span>Total Missing Values</span>
              <span className="font-bold">
                {analysis.total_missing_values || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Duplicate Rows</span>
              <span className="font-bold">
                {analysis.duplicate_rows || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Numeric Columns</span>
              <span className="font-bold">
                {analysis.numeric_columns?.length || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Categorical Columns</span>
              <span className="font-bold">
                {analysis.categorical_columns?.length || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Model</span>
              <span className="font-bold text-cyan-400">
                {modelInfo.algorithm || "N/A"}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
            <div className="max-w-7xl mx-auto mt-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-4">
            AI Business Intelligence Report
          </h2>

          <p className="text-slate-300 leading-8">

            This report summarizes the uploaded dataset, machine learning model,
            data analysis, and prediction system. The dataset has been processed
            successfully and the trained model is ready for prediction.
            You can download this report as PDF or CSV in future versions
            of the application.

          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
            >
              <FaFilePdf className="inline mr-2" />
              Print / Save PDF
            </button>

            <button
              onClick={() => alert("CSV Export Coming Soon")}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              <FaFileCsv className="inline mr-2" />
              Export CSV
            </button>

          </div>

        </div>

      </div> {/* Footer wrapper */}

    </div> {/* max-w-7xl mx-auto */}

    </main>

  );
}

const downloadReport = () => {
  window.open("http://127.0.0.1:5000/download-report", "_blank");
};

export default Reports;
