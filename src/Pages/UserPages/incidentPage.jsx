import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch incident by ID
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/incident/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch incident");
        }
        const data = await response.json();
        setIncident(data);
        setFormData({
          Location: data.Location || "",
          WeatherCondition: data.WeatherCondition || "",
          HTPLShiftInCharge: data.HTPLShiftInCharge || "",
          ContractorSupervisor: data.ContractorSupervisor || "",
          IncidentReportedBy: data.IncidentReportedBy || "",
          ReportPreparedBy: data.ReportPreparedBy || "",
          IncidentTitle: data.IncidentTitle || "",
          IncidentSummary: data.IncidentSummary || "",
          TypeInjury: data.TypeInjury || false,
          CountInjury: data.CountInjury || 0,
          TypePropertyDamage: data.TypePropertyDamage || false,
          CountPropertyDamage: data.CountPropertyDamage || 0,
          TypeFire: data.TypeFire || false,
          CountFire: data.CountFire || 0,
          TypeNearMiss: data.TypeNearMiss || false,
          CountNearMiss: data.CountNearMiss || 0,
          TypeEnvironment: data.TypeEnvironment || false,
          CountEnvironment: data.CountEnvironment || 0,
          TypeFatality: data.TypeFatality || false,
          CountFatality: data.CountFatality || 0,
          TypeOther: data.TypeOther || false,
          CountOther: data.CountOther || 0,
          // Add training fields
          training_type_required: data.training_type_required || "",
          training_description: data.training_description || "",
          // Note: Arrays like InjuredHTPLEmployees are not editable in this form for simplicity
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/incident/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update incident");
      }
      alert("Incident updated successfully!");
      navigate("/");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  if (!incident) {
    return <div className="text-center p-6">Incident not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300">
        <div className="bg-blue-600 text-white text-center py-3">
          <h1 className="text-2xl font-bold">Incident Report Details</h1>
        </div>
        <div className="p-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-4 py-2 mb-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </button>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Incident ID</label>
                <input
                  type="text"
                  value={incident.IncidentID}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Date</label>
                <input
                  type="date"
                  value={new Date(incident.IncidentDate).toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Time</label>
                <input
                  type="time"
                  value={new Date(incident.IncidentTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Weather Condition</label>
                <input
                  type="text"
                  name="WeatherCondition"
                  value={formData.WeatherCondition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Shift In Charge</label>
                <input
                  type="text"
                  name="HTPLShiftInCharge"
                  value={formData.HTPLShiftInCharge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contractor Supervisor</label>
                <input
                  type="text"
                  name="ContractorSupervisor"
                  value={formData.ContractorSupervisor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reported By</label>
                <input
                  type="text"
                  name="IncidentReportedBy"
                  value={formData.IncidentReportedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Report Prepared By</label>
                <input
                  type="text"
                  name="ReportPreparedBy"
                  value={formData.ReportPreparedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Title</label>
                <input
                  type="text"
                  name="IncidentTitle"
                  value={formData.IncidentTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Summary</label>
              <textarea
                name="IncidentSummary"
                value={formData.IncidentSummary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeInjury"
                    checked={formData.TypeInjury}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Injury
                </label>
                <input
                  type="number"
                  name="CountInjury"
                  value={formData.CountInjury}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypePropertyDamage"
                    checked={formData.TypePropertyDamage}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Property Damage
                </label>
                <input
                  type="number"
                  name="CountPropertyDamage"
                  value={formData.CountPropertyDamage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeFire"
                    checked={formData.TypeFire}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Fire
                </label>
                <input
                  type="number"
                  name="CountFire"
                  value={formData.CountFire}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeNearMiss"
                    checked={formData.TypeNearMiss}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Near Miss
                </label>
                <input
                  type="number"
                  name="CountNearMiss"
                  value={formData.CountNearMiss}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeEnvironment"
                    checked={formData.TypeEnvironment}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Environment
                </label>
                <input
                  type="number"
                  name="CountEnvironment"
                  value={formData.CountEnvironment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeFatality"
                    checked={formData.TypeFatality}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Fatality
                </label>
                <input
                  type="number"
                  name="CountFatality"
                  value={formData.CountFatality}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="TypeOther"
                    checked={formData.TypeOther}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Other
                </label>
                <input
                  type="number"
                  name="CountOther"
                  value={formData.CountOther}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Injured Employees</label>
              <div className="border border-gray-300 p-3 bg-gray-100">
                {incident.InjuredHTPLEmployees.map((employee, index) => (
                  <div key={index} className="mb-2">
                    <p>Name: {employee.name}</p>
                    <p>ID/Gate Pass: {employee.id_no_gate_pass_no}</p>
                    <p>Department: {employee.department}</p>
                    <p>Age: {employee.age}</p>
                    <p>Sex: {employee.sex}</p>
                    <p>Contact: {employee.contact_number}</p>
                    {employee.injury_type && <p>Injury Type: {employee.injury_type}</p>}
                    {employee.medical_attention && <p>Medical Attention: {employee.medical_attention}</p>}
                  </div>
                ))}
                {incident.InjuredHTPLEmployees.length === 0 && <p>No injured employees</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Injured Contract Workers</label>
              <div className="border border-gray-300 p-3 bg-gray-100">
                {incident.InjuredContractWorkers.map((worker, index) => (
                  <div key={index} className="mb-2">
                    <p>Name: {worker.name}</p>
                    <p>ID/Gate Pass: {worker.id_no_gate_pass_no}</p>
                    <p>Department: {worker.department}</p>
                    <p>Age: {worker.age}</p>
                    <p>Sex: {worker.sex}</p>
                    <p>Contact: {worker.contact_number}</p>
                  </div>
                ))}
                {incident.InjuredContractWorkers.length === 0 && <p>No injured contract workers</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Injured Visitors</label>
              <div className="border border-gray-300 p-3 bg-gray-100">
                {incident.InjuredVisitors.map((visitor, index) => (
                  <div key={index} className="mb-2">
                    <p>Name: {visitor.name}</p>
                    <p>ID/Gate Pass: {visitor.id_no_gate_pass_no}</p>
                    <p>Department: {visitor.department}</p>
                    <p>Age: {visitor.age}</p>
                    <p>Sex: {visitor.sex}</p>
                    <p>Contact: {visitor.contact_number}</p>
                  </div>
                ))}
                {incident.InjuredVisitors.length === 0 && <p>No injured visitors</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Uploaded Files</label>
              <div className="border border-gray-300 p-3 bg-gray-100">
                {incident.UploadedFiles.map((file, index) => (
                  <div key={index}>{file.original_name || file}</div>
                ))}
                {incident.UploadedFiles.length === 0 && <p>No files uploaded</p>}
              </div>
            </div>

            <div className="bg-blue-600 text-white text-center py-3">
                <h3 className="text-xl font-bold">Action required</h3>
              </div>

              <div className="border border-gray-300 p-3 mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Training Type Required
              </label>
              <select
                name="training_type_required"
                value={formData.training_type_required}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select training type</option>
                <option value="Safety Training">Safety Training</option>
                <option value="First Aid Training">First Aid Training</option>
                <option value="Fire Drill / Evacuation Training">Fire Drill / Evacuation Training</option>
                <option value="Equipment Handling Training">Equipment Handling Training</option>
                <option value="Hazard Awareness Training">Hazard Awareness Training</option>
                <option value="Emergency Response Training">Emergency Response Training</option>
                <option value="Incident Reporting Protocol">Incident Reporting Protocol</option>
                <option value="Workplace Ergonomics Training">Workplace Ergonomics Training</option>
                <option value="Chemical Handling Training">Chemical Handling Training</option>
                <option value="Technical Training">Technical Training</option>
              </select>
            </div>

            <div className="border border-gray-300 p-3 mt-4">
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Assign Trainer
  </label>
  <select
    name="assigned_trainer"
    value={formData.assigned_trainer}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">-- Select Trainer --</option>
    <option value="trainer_1">Trainer 1</option>
    <option value="trainer_2">Trainer 2</option>
    <option value="trainer_3">Trainer 3</option>
    <option value="trainer_4">Trainer 4</option>
  </select>
  <p className="text-xs text-gray-500 mt-1">
    Choose the trainer responsible for follow-up or corrective training related to this incident.
  </p>
</div>




            <div className="border border-gray-300 p-3 mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="training_description"
                value={formData.training_description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional information in text"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;