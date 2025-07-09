import React, { useState } from "react";
import {
  Filter,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  MapPin,
  Users,
  Calendar,
  AlertTriangle,
  Eye,
} from "lucide-react";

// Dummy data for height work permit requests
const dummyRequests = [
  {
    id: 1,
    permitNumber: "HTPL/HWP/001",
    location: "Building A, Floor 5",
    permitDate: "2025-07-01",
    validUpto: "2025-07-02T18:00",
    totalWorkers: 5,
    workDescription: "Roof maintenance and HVAC installation",
    status: "Pending",
    requestedBy: "John Doe",
    department: "Maintenance",
    supervisorName: "Mike Johnson",
    shiftInCharge: "Evening Shift",
    weatherCondition: "Clear",
    riskLevel: "Medium",
    priority: "High"
  },
  {
    id: 2,
    permitNumber: "HTPL/HWP/002",
    location: "Warehouse B, Section C",
    permitDate: "2025-07-03",
    validUpto: "2025-07-04T17:00",
    totalWorkers: 8,
    workDescription: "Scaffold erection for painting",
    status: "Approved",
    requestedBy: "Sarah Smith",
    department: "Operations",
    supervisorName: "David Brown",
    shiftInCharge: "Day Shift",
    weatherCondition: "Partly Cloudy",
    riskLevel: "High",
    priority: "Medium"
  },
  {
    id: 3,
    permitNumber: "HTPL/HWP/003",
    location: "Tower C, Exterior",
    permitDate: "2025-07-05",
    validUpto: "2025-07-06T20:00",
    totalWorkers: 3,
    workDescription: "Window cleaning at height",
    status: "Rejected",
    requestedBy: "Robert Wilson",
    department: "Facility",
    supervisorName: "Lisa Davis",
    shiftInCharge: "Night Shift",
    weatherCondition: "Windy",
    riskLevel: "Low",
    priority: "Low"
  },
  {
    id: 4,
    permitNumber: "HTPL/HWP/004",
    location: "Site D, Roof",
    permitDate: "2025-07-07",
    validUpto: "2025-07-08T16:00",
    totalWorkers: 6,
    workDescription: "Antenna installation",
    status: "Pending",
    requestedBy: "Emily Johnson",
    department: "Technical",
    supervisorName: "Chris Anderson",
    shiftInCharge: "Day Shift",
    weatherCondition: "Clear",
    riskLevel: "High",
    priority: "High"
  },
];

const MyRequests = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [requests, setRequests] = useState(dummyRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter requests based on status
  const filteredRequests =
    statusFilter === "All"
      ? requests
      : requests.filter((request) => request.status === statusFilter);

  // Handle status change (Approve/Reject)
  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    setSelectedRequest(null);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border-2 border-gray-300 mb-6">
          <div className="bg-blue-600 text-white text-center py-3">
            <h1 className="text-2xl font-bold">Hind Terminals Pvt Ltd - Palwal</h1>
            <h2 className="text-lg">Height Work Permit - Approval System</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-300 p-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Total Requests</label>
                <div className="text-2xl font-bold text-blue-600">{requests.length}</div>
              </div>
              <div className="border border-gray-300 p-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pending Approval</label>
                <div className="text-2xl font-bold text-yellow-600">
                  {requests.filter(r => r.status === "Pending").length}
                </div>
              </div>
              <div className="border border-gray-300 p-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Approved Today</label>
                <div className="text-2xl font-bold text-green-600">
                  {requests.filter(r => r.status === "Approved").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white border-2 border-gray-300 mb-6">
          <div className="border-b border-gray-300 bg-gray-100 px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              Filter Requests
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-gray-300 p-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status Filter</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white border-2 border-gray-300">
          <div className="border-b border-gray-300 bg-gray-100 px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Height Work Permit Requests - Approval Pending
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Permit Number
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Location
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Requested By
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Department
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Workers
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Risk Level
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Priority
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Status
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="border border-gray-300 px-4 py-6 text-center text-gray-600"
                    >
                      No requests found for the selected status.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          {request.permitNumber}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                          {request.location}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        {request.requestedBy}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        {request.department}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-600" />
                          {request.totalWorkers}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(request.riskLevel)}`}>
                          {request.riskLevel}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : request.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="flex items-center px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          {request.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(request.id, "Approved")
                                }
                                className="flex items-center px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(request.id, "Rejected")
                                }
                                className="flex items-center px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed View Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
              <div className="bg-blue-600 text-white text-center py-3">
                <h3 className="text-xl font-bold">Height Work Permit Details</h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Permit Number</label>
                    <div className="text-sm">{selectedRequest.permitNumber}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                    <div className="text-sm">{selectedRequest.location}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Permit Date</label>
                    <div className="text-sm">{selectedRequest.permitDate}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Valid Up To</label>
                    <div className="text-sm">{new Date(selectedRequest.validUpto).toLocaleString()}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Requested By</label>
                    <div className="text-sm">{selectedRequest.requestedBy}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                    <div className="text-sm">{selectedRequest.department}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Supervisor Name</label>
                    <div className="text-sm">{selectedRequest.supervisorName}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Shift In Charge</label>
                    <div className="text-sm">{selectedRequest.shiftInCharge}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Total Workers</label>
                    <div className="text-sm">{selectedRequest.totalWorkers}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Weather Condition</label>
                    <div className="text-sm">{selectedRequest.weatherCondition}</div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Risk Level</label>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(selectedRequest.riskLevel)}`}>
                        {selectedRequest.riskLevel}
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-300 p-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-300 p-3 mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Work Description</label>
                  <div className="text-sm">{selectedRequest.workDescription}</div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {selectedRequest.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedRequest.id, "Approved")}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedRequest.id, "Rejected")}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;