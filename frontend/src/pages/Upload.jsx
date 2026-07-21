import { useRef, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaFileCsv } from "react-icons/fa";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef();

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const uploadDataset = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">

      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-white text-center">

          Upload Dataset

        </h1>

        <p className="text-slate-400 text-center mt-3">

          Upload your CSV dataset to start analysis.

        </p>

        {/* Hidden Input */}

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />

        {/* Upload Box */}

        <div
          onClick={handleBrowse}
          className="mt-10 border-2 border-dashed border-blue-500 rounded-2xl p-12 text-center cursor-pointer hover:bg-slate-800 transition duration-300"
        >

          <FaCloudUploadAlt className="text-6xl text-blue-500 mx-auto mb-5" />

          <h2 className="text-2xl font-semibold text-white">

            Click to Browse

          </h2>

          <p className="text-slate-400 mt-2">

            Only CSV files are supported

          </p>

        </div>

        {/* Selected File */}

        {file && (

          <div className="mt-8 flex items-center gap-3 bg-slate-800 rounded-xl p-4">

            <FaFileCsv className="text-green-500 text-2xl" />

            <div>

              <p className="text-white font-medium">

                {file.name}

              </p>

              <p className="text-slate-400 text-sm">

                Ready to Upload

              </p>

            </div>

          </div>

        )}

        {/* Upload Button */}

        <button
          onClick={uploadDataset}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition duration-300 text-white py-4 rounded-xl font-semibold text-lg"
        >

          Upload Dataset

        </button>

        {/* Message */}

        {message && (

          <div className="mt-6 text-center text-green-400 font-medium">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}

export default Upload;