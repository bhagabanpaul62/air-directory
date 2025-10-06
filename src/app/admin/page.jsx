"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("airlines");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'

  // CSV Upload State
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Fetch data based on active tab
  const fetchData = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "airlines"
          ? "/api/admin/airlines"
          : "/api/admin/airports";
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
      });

      const response = await fetch(`${endpoint}?${params}`);
      const result = await response.json();

      if (response.ok) {
        setData(activeTab === "airlines" ? result.airlines : result.airports);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
    fetchData(1, "");
  }, [activeTab]);

  // Effect to handle search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData(1, searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, searchTerm);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const endpoint =
        activeTab === "airlines"
          ? `/api/admin/airlines/${id}`
          : `/api/admin/airports/${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (response.ok) {
        fetchData(currentPage, searchTerm);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle edit/add modal
  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setEditingItem(item);
    setShowModal(true);
  };

  // Handle save
  const handleSave = async (formData) => {
    try {
      const endpoint =
        activeTab === "airlines"
          ? "/api/admin/airlines"
          : "/api/admin/airports";

      let response;
      if (modalMode === "add") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`${endpoint}/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        setShowModal(false);
        fetchData(currentPage, searchTerm);
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // CSV Upload handlers
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadMessage("Please select a file");
      return;
    }

    setIsUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/import/${activeTab}`, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let result;
      try {
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error(`Unexpected response: ${text?.slice(0, 200)}`);
      }

      if (response.ok) {
        setUploadMessage(
          `Success: rows=${result.count}, upserted=${result.upserted}, modified=${result.modified}`
        );
        setFile(null);
        fetchData(currentPage, searchTerm);
      } else {
        setUploadMessage(`Error: ${result.message || "Upload failed"}`);
      }
    } catch (error) {
      setUploadMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-black mt-1">Manage airlines and airports data</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("airlines")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "airlines"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-black hover:text-black hover:border-gray-300"
              }`}
            >
              Airlines
            </button>
            <button
              onClick={() => setActiveTab("airports")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "airports"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-black hover:text-black hover:border-gray-300"
              }`}
            >
              Airports
            </button>
          </nav>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />

            {/* Add Button */}
            <button
              onClick={() => openModal("add")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add {activeTab === "airlines" ? "Airline" : "Airport"}
            </button>
          </div>

          {/* CSV Upload */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-black mb-2">CSV Upload</h3>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="text-sm text-black"
              />
              <button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:bg-gray-400"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploadMessage && (
              <p
                className={`mt-2 text-xs ${
                  uploadMessage.startsWith("Success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {uploadMessage}
              </p>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-black">Loading...</p>
            </div>
          ) : (
            <DataTable
              data={data}
              type={activeTab}
              onEdit={(item) => openModal("edit", item)}
              onDelete={handleDelete}
            />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-black">
                Showing {(currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} results
              </div>
              <div className="flex gap-1">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type={activeTab}
          mode={modalMode}
          item={editingItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Data Table Component
function DataTable({ data, type, onEdit, onDelete }) {
  const columns =
    type === "airlines"
      ? [
          { key: "airline_id", label: "ID" },
          { key: "Name", label: "Name" },
          { key: "IATA", label: "IATA" },
          { key: "ICAO", label: "ICAO" },
          { key: "Country", label: "Country" },
          { key: "City", label: "City" },
          { key: "Website", label: "Website" },
        ]
      : [
          { key: "airport_id", label: "ID" },
          { key: "Name", label: "Name" },
          { key: "IATA", label: "IATA" },
          { key: "ICAO", label: "ICAO" },
          { key: "Country", label: "Country" },
          { key: "City", label: "City" },
          { key: "Website", label: "Website" },
        ];

  if (data.length === 0) {
    return <div className="p-8 text-center text-black">No {type} found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-black"
                >
                  {column.key === "Website" && item[column.key] ? (
                    <a
                      href={item[column.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 truncate max-w-xs block"
                    >
                      {item[column.key].replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span
                      className="truncate max-w-xs block"
                      title={item[column.key]}
                    >
                      {item[column.key] || "-"}
                    </span>
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, type, mode, item, onSave }) {
  const getInitialFormData = () => {
    const baseFields = {
      Name: "",
      IATA: "",
      ICAO: "",
      Country: "",
      City: "",
      Continent: "",
      Region: "",
      Website: "",
      Email: "",
      Phone: "",
      Address: "",
      Info: "",
      Description: "",
      Facebook: "",
      Instagram: "",
      LinkedIn: "",
      Logo: "",
      Background_Image: "",
      Latitude: "",
      Longitude: "",
    };

    if (type === "airlines") {
      return {
        ...baseFields,
        airline_id: "",
        youtube: "",
      };
    } else {
      return {
        ...baseFields,
        airport_id: "",
        X: "",
        YouTube: "",
      };
    }
  };

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData(item);
    } else if (mode === "add") {
      setFormData(getInitialFormData());
    }
  }, [mode, item, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">
              {mode === "add" ? "Add" : "Edit"}{" "}
              {type === "airlines" ? "Airline" : "Airport"}
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-black text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type === "airlines" && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Airline ID
                  </label>
                  <input
                    type="text"
                    name="airline_id"
                    placeholder="Airline ID"
                    value={formData.airline_id || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              {type === "airports" && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Airport ID
                  </label>
                  <input
                    type="text"
                    name="airport_id"
                    placeholder="Airport ID"
                    value={formData.airport_id || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="Name"
                  placeholder={`${
                    type === "airlines" ? "Airline" : "Airport"
                  } Name`}
                  value={formData.Name || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  IATA Code
                </label>
                <input
                  type="text"
                  name="IATA"
                  placeholder="IATA Code"
                  value={formData.IATA || ""}
                  onChange={handleChange}
                  maxLength="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  ICAO Code
                </label>
                <input
                  type="text"
                  name="ICAO"
                  placeholder="ICAO Code"
                  value={formData.ICAO || ""}
                  onChange={handleChange}
                  maxLength="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Location Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Continent
                </label>
                <input
                  type="text"
                  name="Continent"
                  placeholder="Continent"
                  value={formData.Continent || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="Country"
                  placeholder="Country"
                  value={formData.Country || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Region
                </label>
                <input
                  type="text"
                  name="Region"
                  placeholder="Region"
                  value={formData.Region || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="City"
                  placeholder="City"
                  value={formData.City || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="Address"
                  placeholder="Full Address"
                  value={formData.Address || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Coordinates
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="Latitude"
                    placeholder="Latitude"
                    value={formData.Latitude || ""}
                    onChange={handleChange}
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <input
                    type="number"
                    name="Longitude"
                    placeholder="Longitude"
                    value={formData.Longitude || ""}
                    onChange={handleChange}
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="Website"
                  placeholder="https://example.com"
                  value={formData.Website || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  placeholder="contact@example.com"
                  value={formData.Email || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Phone Number"
                  value={formData.Phone || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Social Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  name="Facebook"
                  placeholder="Facebook Profile URL"
                  value={formData.Facebook || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  name="Instagram"
                  placeholder="Instagram Profile URL"
                  value={formData.Instagram || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="LinkedIn"
                  placeholder="LinkedIn Profile URL"
                  value={formData.LinkedIn || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {type === "airlines" && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    YouTube
                  </label>
                  <input
                    type="url"
                    name="youtube"
                    placeholder="YouTube Channel URL"
                    value={formData.youtube || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              )}

              {type === "airports" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      X (Twitter)
                    </label>
                    <input
                      type="url"
                      name="X"
                      placeholder="X/Twitter Profile URL"
                      value={formData.X || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      YouTube
                    </label>
                    <input
                      type="url"
                      name="YouTube"
                      placeholder="YouTube Channel URL"
                      value={formData.YouTube || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description & Media */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Description & Media
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Info
                </label>
                <textarea
                  name="Info"
                  placeholder="Brief information"
                  value={formData.Info || ""}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Description
                </label>
                <textarea
                  name="Description"
                  placeholder="Detailed description"
                  value={formData.Description || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    name="Logo"
                    placeholder="Logo Image URL"
                    value={formData.Logo || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    name="Background_Image"
                    placeholder="Background Image URL"
                    value={formData.Background_Image || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 p-6 border-t border-gray-200 bg-white sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
