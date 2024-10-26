import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { findMessage } from "../utils/helpers";

const Cases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-all-cases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setCases(await response.json());
        } else {
          const errorResult = await response.json();
          toast.error(findMessage(errorResult, "Error fetching cases!"));
        }
      } catch (error) {
        toast.error("Error fetching cases!");
      }
    };
    fetchPatients();
  }, []);

  if (!cases) return <Spinner />;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">
        Patient Folders
      </h1>
      {!cases.length && (
        <div className="w-full text-center text-4xl my-10 text-bold text-orange-600">
          No Cases Yet!
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cases.map((patientCase) => (
          <div
            key={patientCase.patient_name} // Unique key for each folder
            onClick={() => navigate("/annotate/" + patientCase.case_number)} // Handle folder click
            className={`cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl p-6 rounded-lg shadow-lg text-center text-white font-semibold text-xl ${
              patientCase.image_status === "processing"
                ? "bg-slate-500 pointer-events-none"
                : patientCase.review_status === "complete"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            <div className="bg-white text-black p-4 rounded mb-4 shadow">
              <h2 className="font-bold text-2xl">{patientCase.patient_name}</h2>
              <p className="text-lg">{patientCase.patient_number}</p>
            </div>
            <div className="text-left text-lg">
              <p>
                <span className="font-bold">Case Number:</span>{" "}
                {patientCase.case_number}
              </p>
              <p>
                <span className="font-bold">Doctor:</span>{" "}
                {patientCase.doctor_name}
              </p>
              <p>
                <span className="font-bold">Status:</span>{" "}
                {patientCase.image_status === "pending" ? (
                  <span className="text-yellow-300">
                    Images not captured yet
                  </span>
                ) : patientCase.image_status === "processing" ? (
                  <span className="text-yellow-300">Processing</span>
                ) : (
                  patientCase.review_status
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")} // Go back to previous selection
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Cases;
