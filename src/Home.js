import React, { useState } from 'react';

const doctors = ["Dr. Aysha Imran", "Dr. Aimen", "Dr. Waqas Sultani", "Dr. Mohsin Ali"];

const Home = ({ navigate }) => {
  const [formData, setFormData] = useState({
    patientNumber: '',
    caseNumber: '',
    patientName: '',
    doctorName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
    navigate("/annotate",formData);
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-purple-700">Case Number</label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-purple-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-purple-700">Doctor Name</label>
            <select
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="" disabled>Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
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