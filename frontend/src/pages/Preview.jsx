import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaTable,
  FaSearch,
  FaDatabase,
  FaColumns,
  FaSyncAlt,
} from "react-icons/fa";

function Preview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [dataset, setDataset] = useState({
    dataset_name: "",
    total_rows: 0,
    total_columns: 0,
    columns: [],
    preview: [],
  });

  const loadPreview = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://127.0.0.1:5000/preview");

      if (res.data.success) {
        setDataset(res.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Unable to connect with Flask Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, []);

  const filteredData = useMemo(() => {
    if (!search) return dataset.preview;

    return dataset.preview.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, dataset.preview]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading Dataset Preview...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-8 text-center">
          <h1 className="text-red-400 text-2xl font-bold">
            {error}
          </h1>

          <button
            onClick={loadPreview}
            className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
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
              Dataset Preview
            </h1>

            <p className="text-slate-400 mt-2">
              Preview uploaded dataset records
            </p>

          </div>

          <button
            onClick={loadPreview}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

            <FaDatabase className="text-cyan-400 text-3xl mb-3" />

            <p className="text-slate-400">
              Dataset
            </p>

            <h2
              title={dataset.dataset_name}
              className="text-white font-semibold truncate mt-2"
            >
              {dataset.dataset_name}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

            <FaTable className="text-green-400 text-3xl mb-3" />

            <p className="text-slate-400">
              Total Rows
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {dataset.total_rows.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

            <FaColumns className="text-yellow-400 text-3xl mb-3" />

            <p className="text-slate-400">
              Total Columns
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {dataset.total_columns.toLocaleString()}
            </h2>

          </div>

        </div>

        <div className="mt-8 relative">

          <FaSearch className="absolute left-5 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-5 text-white outline-none focus:border-blue-500"
          />

        </div>
                <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  {dataset.columns.map((column) => (

                    <th
                      key={column}
                      className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                    >
                      {column}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {filteredData.length > 0 ? (

                  filteredData.map((row, index) => (

                    <tr
                      key={index}
                      className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                    >

                      {dataset.columns.map((column) => (

                        <td
                          key={column}
                          className="px-6 py-4 text-slate-300 whitespace-nowrap"
                        >
                          {row[column] !== null && row[column] !== undefined
                            ? String(row[column])
                            : "-"}
                        </td>

                      ))}

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={dataset.columns.length}
                      className="text-center py-10 text-slate-400"
                    >
                      No matching records found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
              

    </main>
  );
}

export default Preview;

