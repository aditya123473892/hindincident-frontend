import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Cloud, User, FileText, AlertTriangle, Save, Printer } from 'lucide-react';
import logo from '../../Assets/hindimg.png'
export default function IncidentReportForm() {
  const [formData, setFormData] = useState({
    incidentDate: '',
    incidentTime: '',
    location: '',
    weatherCondition: '',
    htplShiftInCharge: '',
    contractorSupervisor: '',
    incidentReportedBy: '',
    reportPreparedBy: '',
    incidentTitle: '',
    typeOfIncident: {
      nearMiss: false,
      propertyDamage: false,
      materialDamage: false,
      injury: false,
      lti: false,
      theft: false,
      qualityIssue: false,
      fatalIncident: false
    },
    numbers: '',
    injuredPersonDetails: {
      htplEmployee: false,
      contractWorker: false,
      visitors: false
    },
    numberOfPersonsInjured: '',
    nameOfInjuredPersons: '',
    idNoGatePassNo: '',
    department: '',
    ageSex: '',
    contactNumber: '',
    incidentSummary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Incident report submitted successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          {/* Top Header with Logo and Document Info */}
          <div className="flex flex-col lg:flex-row items-center justify-between p-6 border-b border-gray-200">
            {/* Logo Section */}
            <div className="flex items-center mb-4 lg:mb-0">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Hind Logo" className="h-12 w-auto object-contain" />
          </div>
            </div>

            {/* Center Title */}
            <div className="text-center flex-1 mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">
                Incident Information Report
              </h2>
            </div>

            {/* Document Details */}
            <div className="bg-gray-50 border border-gray-300 rounded-md p-3 text-sm">
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Doc No:</span>
                  <span className="text-gray-800">HTPL/OHS/10A</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Eff. Date:</span>
                  <span className="text-gray-800">03.10.2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Rev no & Date:</span>
                  <span className="text-gray-800">00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Name Section */}
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
            <div className="border-2 border-black p-2 text-center">
              <h1 className="text-lg font-bold text-gray-900">
                Hind Terminals Pvt Ltd- Palwal
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Incident Date
                </label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Incident Time
                </label>
                <input
                  type="time"
                  name="incidentTime"
                  value={formData.incidentTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter incident location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Weather Condition
                </label>
                <select
                  name="weatherCondition"
                  value={formData.weatherCondition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select weather condition</option>
                  <option value="Clear">Clear</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Foggy">Foggy</option>
                  <option value="Windy">Windy</option>
                  <option value="Hot">Hot</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personnel Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Personnel Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTPL Shift In Charge
                </label>
                <input
                  type="text"
                  name="htplShiftInCharge"
                  value={formData.htplShiftInCharge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter shift in charge name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contractor Supervisor
                </label>
                <input
                  type="text"
                  name="contractorSupervisor"
                  value={formData.contractorSupervisor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter supervisor name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Reported By
                </label>
                <input
                  type="text"
                  name="incidentReportedBy"
                  value={formData.incidentReportedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter reporter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Prepared By
                </label>
                <input
                  type="text"
                  name="reportPreparedBy"
                  value={formData.reportPreparedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter preparer name"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Title
              </label>
              <input
                type="text"
                name="incidentTitle"
                value={formData.incidentTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter incident title"
                required
              />
            </div>
          </div>

          {/* Type of Incident */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Type of Incident
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(formData.typeOfIncident).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleCheckboxChange('typeOfIncident', key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numbers
              </label>
              <input
                type="text"
                name="numbers"
                value={formData.numbers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter relevant numbers"
              />
            </div>
          </div>

          {/* Injured Person Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Details of Injured Person
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(formData.injuredPersonDetails).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleCheckboxChange('injuredPersonDetails', key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Person(s) Injured
                </label>
                <input
                  type="number"
                  name="numberOfPersonsInjured"
                  value={formData.numberOfPersonsInjured}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter number"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Injured Person(s)
                </label>
                <input
                  type="text"
                  name="nameOfInjuredPersons"
                  value={formData.nameOfInjuredPersons}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter name(s)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID No/Gate Pass No
                </label>
                <input
                  type="text"
                  name="idNoGatePassNo"
                  value={formData.idNoGatePassNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter ID or gate pass number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age/Sex
                </label>
                <input
                  type="text"
                  name="ageSex"
                  value={formData.ageSex}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., 25/Male"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
          </div>

          {/* Incident Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Summary of the Incident
            </h3>
            
            <div>
              <textarea
                name="incidentSummary"
                value={formData.incidentSummary}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                placeholder="Provide a detailed summary of the incident including what happened, when, where, how, and any contributing factors..."
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="text-sm text-gray-600">
                <p><strong>Prepared By:</strong> {formData.reportPreparedBy || '_________________'}</p>
                <p className="mt-2"><strong>For:</strong> Hind Terminals Pvt Ltd - Palwal</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
