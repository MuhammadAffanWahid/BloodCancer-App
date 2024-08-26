import React, { useState, useEffect } from 'react';

const doctors = ["Dr. Aysha Imran", "Dr. Aimen", "Dr. Waqas Sultani", "Dr. Mohsin Ali"];

const Home = ({ navigate, patientDetails, imageFolder }) => {
  const [formData, setFormData] = useState({
    patientNumber: '',
    caseNumber: '',
    patientName: '',
    doctorName: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patientDetails) {
      if(doctors.includes(patientDetails.doctor_name)){
      setFormData({
        patientNumber: patientDetails.patient_number || '',
        caseNumber: patientDetails.case_number || '',
        patientName: patientDetails.patient_name || '',
        doctorName: patientDetails.doctor_name || ''
      });
    }
    else
    {
      setFormData({
        patientNumber: patientDetails.patient_number || '',
        caseNumber: patientDetails.case_number || '',
        patientName: patientDetails.patient_name || '',
      });
    }
  }
  }, [patientDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!/^\d+$/.test(formData.patientNumber)) {
      formErrors.patientNumber = 'Patient Number must be numeric.';
    }

    if (!/^\d+$/.test(formData.caseNumber)) {
      formErrors.caseNumber = 'Case Number must be numeric.';
    }

    if (!/^[A-Za-z\s]+$/.test(formData.patientName)) {
      formErrors.patientName = 'Patient Name must contain only letters.';
    }

    if (!doctors.includes(formData.doctorName)) {
      formErrors.doctorName = 'Please select a valid doctor.';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:4000/update-metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder: imageFolder, // Pass the imageFolder
            details: {
              patient_number: formData.patientNumber,
              case_number: formData.caseNumber,
              patient_name: formData.patientName,
              doctor_name: formData.doctorName,
            },
          }),
        });
  
        if (response.ok) {
          console.log('Metadata updated successfully');
          navigate("/annotate", formData, imageFolder);
        } else {
          const errorResult = await response.json();
          console.error('Error updating metadata:', errorResult.error);
          alert('Failed to update metadata');
        }
      } catch (error) {
        console.error('Error during API call:', error);
        alert('Failed to update metadata due to a network error');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex w-screen items-center justify-center bg-gradient-to-r from-purple-200 to-purple-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Patient Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purple-700">Patient Number</label>
            <input
              type="text"
              name="patientNumber"
              value={formData.patientNumber}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.patientNumber ? 'border-red-500' : 'border-purple-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required
            />
            {errors.patientNumber && <p className="text-red-500 text-sm">{errors.patientNumber}</p>}
          </div>
          <div>
            <label className="block text-purple-700">Case Number</label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.caseNumber ? 'border-red-500' : 'border-purple-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required
            />
            {errors.caseNumber && <p className="text-red-500 text-sm">{errors.caseNumber}</p>}
          </div>
          <div>
            <label className="block text-purple-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.patientName ? 'border-red-500' : 'border-purple-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required
            />
            {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
          </div>
          <div>
            <label className="block text-purple-700">Doctor Name</label>
            <select
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.doctorName ? 'border-red-500' : 'border-purple-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              required
            >
              <option value="" disabled>Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
            {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Start Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;