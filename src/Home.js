import React, { useState, useEffect } from "react"; // Import React and hooks for managing state and lifecycle
import { useNavigate } from "react-router";

// Array of available doctors for selection
const doctors = [
  "Dr. Aysha Imran",
  "Dr. Aimen",
  "Dr. Waqas Sultani",
  "Dr. Mohsin Ali",
];

// Home component for handling patient details input and navigation
const Home = () => {
  // State variable to manage form data
  const [formData, setFormData] = useState({
    patientNumber: "", // Patient's unique number
    caseNumber: "", // Case number associated with the patient
    patientName: "", // Name of the patient
    doctorName: "", // Selected doctor's name
  });

  const patientDetails = {};
  //TO DO: fix it

  // State variable to manage form validation errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Effect hook to pre-fill the form if patient details are provided
  useEffect(() => {
    if (patientDetails) {
      // Pre-fill form fields for the Review action (Doctor review)
      setFormData({
        patientNumber: patientDetails.patient_number || "",
        caseNumber: patientDetails.case_number || "",
        patientName: patientDetails.patient_name || "",
        // Validate doctor name against the list of doctors
        doctorName: doctors.includes(patientDetails.doctor_name)
          ? patientDetails.doctor_name
          : "",
      });
    }
  }, [patientDetails]); // Dependency array: runs effect when patientDetails change

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the input name and value
    setFormData({
      ...formData, // Spread existing form data
      [name]: value, // Update the specific field
    });
  };

  // Function to validate form inputs and return errors
  const validateForm = () => {
    let formErrors = {}; // Object to store validation errors

    // Validate Patient Number: must be numeric
    if (!/^\d+$/.test(formData.patientNumber)) {
      formErrors.patientNumber = "Patient Number must be numeric.";
    }

    // Validate Case Number: must be numeric
    if (!/^\d+$/.test(formData.caseNumber)) {
      formErrors.caseNumber = "Case Number must be numeric.";
    }

    // Validate Patient Name: must contain only letters
    if (!/^[A-Za-z\s]+$/.test(formData.patientName)) {
      formErrors.patientName = "Patient Name must contain only letters.";
    }

    // Validate Doctor Name: must be in the list of available doctors
    if (!doctors.includes(formData.doctorName)) {
      formErrors.doctorName = "Please select a valid doctor.";
    }

    return formErrors; // Return the object containing any validation errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formErrors = validateForm(); // Validate the form

    // Proceed if no validation errors
    if (Object.keys(formErrors).length === 0) {
      try {
        // Send a POST request to update patient metadata
        const response = await fetch("http://localhost:4000/update-metadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            details: {
              patient_number: formData.patientNumber,
              case_number: formData.caseNumber,
              patient_name: formData.patientName,
              doctor_name: formData.doctorName,
            },
          }),
        });

        // Check if the response is OK
        if (response.ok) {
          console.log("Metadata updated successfully");
          // Navigate based on the presence of patientDetails
          if (patientDetails) {
            // If patientDetails exist, navigate to /annotate for Doctor Review
            navigate("/annotate");
          } else {
            // If no patientDetails, navigate to /capture for Capture case
            navigate("/capture");
          }
        } else {
          // Handle non-OK responses
          const errorResult = await response.json();
          console.error("Error updating metadata:", errorResult.error);
          alert("Failed to update metadata");
        }
      } catch (error) {
        // Handle network errors
        console.error("Error during API call:", error);
        alert("Failed to update metadata due to a network error");
      }
    } else {
      // If there are validation errors, set them in state to display
      setErrors(formErrors);
    }
  };

  // Render the Home component UI
  return (
    <div className="min-h-screen flex w-screen items-center justify-center bg-gradient-to-r from-purple-200 to-purple-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Patient Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purple-700">Patient Number</label>
            <input
              type="text"
              name="patientNumber"
              value={formData.patientNumber}
              onChange={handleChange} // Handle input changes
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.patientNumber ? "border-red-500" : "border-purple-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required // Input is required for form submission
            />
            {errors.patientNumber && (
              <p className="text-red-500 text-sm">{errors.patientNumber}</p>
            )}{" "}
            {/* Display error message */}
          </div>
          <div>
            <label className="block text-purple-700">Case Number</label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange} // Handle input changes
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.caseNumber ? "border-red-500" : "border-purple-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required // Input is required for form submission
            />
            {errors.caseNumber && (
              <p className="text-red-500 text-sm">{errors.caseNumber}</p>
            )}{" "}
            {/* Display error message */}
          </div>
          <div>
            <label className="block text-purple-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange} // Handle input changes
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.patientName ? "border-red-500" : "border-purple-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required // Input is required for form submission
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm">{errors.patientName}</p>
            )}{" "}
            {/* Display error message */}
          </div>
          <div>
            <label className="block text-purple-700">Doctor Name</label>
            <select
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange} // Handle input changes
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.doctorName ? "border-red-500" : "border-purple-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required // Input is required for form submission
            >
              <option value="" disabled>
                Select Doctor
              </option>{" "}
              {/* Default disabled option */}
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option> // Map through doctors to create options
              ))}
            </select>
            {errors.doctorName && (
              <p className="text-red-500 text-sm">{errors.doctorName}</p>
            )}{" "}
            {/* Display error message */}
          </div>
          <div className="flex justify-center">
            <button
              type="submit" // Submit button for the form
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Start Session {/* Button text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home; // Export the Home component for use in other parts of the application
