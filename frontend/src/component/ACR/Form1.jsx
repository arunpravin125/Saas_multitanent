import React, { useState, lazy, Suspense } from "react";
import {
  Calendar,
  User,
  Building,
  FileText,
  AlertCircle,
  ChevronDown,
  Plus,
  Filter,
  Download,
  CheckCircle,
  Upload,
  X,
} from "lucide-react";
// import RichTextEditor from "react-rte";

import "react-quill/dist/quill.snow.css";
import { RichTextEditor } from "../../utils/RichTextEditor";

// Lazy load ReactQuill

const Form1 = () => {
  const [activeTab, setActiveTab] = useState("Attachments");
  // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const [formData, setFormData] = useState({
    owningGroup: "Manufacturer Division",
    owningGroupSite: "",
    originatingSite: "",
    originatingPlant: "",
    changeControlCoordinator: "Julia Marcano",
    targetImplementationDate: "",
    title: "New ETMLAD Manufacturing Line at Juncos",
    relatedChanges: "",
    affectedBusinessUnits: "",
    owningOrIssueingOrganization: "",
    relatedPEGAChange: "",
    projectNumber: "",
    affectedManufacturingSites: "",
    affectedSitesDetails: "",
    changeControlDetermination: "",
    currentState: "",
    futureState: "",
    justification: "",
    riskAssessment: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [auditEntries, setAuditEntries] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});

  // const RichTextEditorField = ({ label, field, value, onChange, error }) => {
  //   return (
  //     <div>
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         {label}* {error && <span className="text-red-500">Required</span>}
  //       </label>
  //       <ReactQuill
  //         theme="snow"
  //         value={value}
  //         onChange={(html) => onChange(field, html)}
  //         className={error ? "border border-red-500 rounded" : ""}
  //       />
  //     </div>
  //   );
  // };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "originatingSite",
      "changeControlCoordinator",
      "title",
      "affectedBusinessUnits",
      "affectedManufacturingSites",
      "currentState",
      "futureState",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log("ACR_FORM!", formData);
    if (validateForm()) {
      // Add audit entry for submission
      const newAuditEntry = {
        id: auditEntries.length + 1,
        user: "Julia Marcano",
        userRole: "Change Control Coordinator",
        activity: "Form Submitted",
        date: new Date().toLocaleString(),
        state: "Draft",
        comments: "Initial form submission",
      };

      setAuditEntries((prev) => [...prev, newAuditEntry]);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file, index) => ({
      id: attachments.length + index + 1,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type,
      uploadDate: new Date().toLocaleString(),
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    event.target.value = ""; // Reset file input
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const addAuditEntry = () => {
    const newEntry = {
      id: auditEntries.length + 1,
      user: "Current User",
      userRole: "Reviewer",
      activity: "Manual Entry",
      date: new Date().toLocaleString(),
      state: "In Review",
      comments: "Manual audit entry added",
    };

    setAuditEntries((prev) => [...prev, newEntry]);
  };

  const workflowSteps = [
    { id: "draft", label: "Draft", active: true },
    { id: "creation", label: "Creation", active: false },
    { id: "assessment", label: "Assessment Approval", active: false },
    { id: "initiation", label: "Initiation Approval", active: false },
    { id: "approved", label: "Approved Open", active: false },
    { id: "final", label: "Final Memo", active: false },
    { id: "closure", label: "Closure", active: false },
  ];

  return (
    <div className="max-h-max bg-gray-50 p-4">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Form submitted successfully!
        </div>
      )}

      <div className="w-full">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="space-y-6">
            {/* Owning Group Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owning Group
                </label>
                <div className="relative">
                  <select
                    value={formData.owningGroup}
                    onChange={(e) =>
                      handleInputChange("owningGroup", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                  >
                    <option>Manufacturer Division</option>
                    <option>Quality Division</option>
                    <option>Operations Division</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owning Group Site
                </label>
                <div className="relative">
                  <select
                    value={formData.owningGroupSite}
                    onChange={(e) =>
                      handleInputChange("owningGroupSite", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="Site A">Site A</option>
                    <option value="Site B">Site B</option>
                    <option value="Site C">Site C</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Change Implementation Details */}
            <div className="border-t ">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change Implementation Details
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Originating Site*{" "}
                      {errors.originatingSite && (
                        <span className="text-red-500">Required</span>
                      )}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.originatingSite}
                        onChange={(e) =>
                          handleInputChange("originatingSite", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none ${
                          errors.originatingSite
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Juncos">Juncos</option>
                        <option value="San Lorenzo">San Lorenzo</option>
                        <option value="Cidra">Cidra</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Originating Plant
                    </label>
                    <div className="relative">
                      <select
                        value={formData.originatingPlant}
                        onChange={(e) =>
                          handleInputChange("originatingPlant", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Plant 1">Plant 1</option>
                        <option value="Plant 2">Plant 2</option>
                        <option value="Plant 3">Plant 3</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Control Coordinator*{" "}
                      {errors.changeControlCoordinator && (
                        <span className="text-red-500">Required</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData.changeControlCoordinator}
                      onChange={(e) =>
                        handleInputChange(
                          "changeControlCoordinator",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.changeControlCoordinator
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Implementation Date
                    </label>
                    <input
                      type="date"
                      value={formData.targetImplementationDate}
                      onChange={(e) =>
                        handleInputChange(
                          "targetImplementationDate",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title*{" "}
                      {errors.title && (
                        <span className="text-red-500">Required</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related Changes
                    </label>
                    <input
                      type="text"
                      value={formData.relatedChanges}
                      onChange={(e) =>
                        handleInputChange("relatedChanges", e.target.value)
                      }
                      placeholder="Enter related changes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Affected Business Units*{" "}
                      {errors.affectedBusinessUnits && (
                        <span className="text-red-500">Required</span>
                      )}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.affectedBusinessUnits}
                        onChange={(e) =>
                          handleInputChange(
                            "affectedBusinessUnits",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none ${
                          errors.affectedBusinessUnits
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Quality">Quality</option>
                        <option value="Supply Chain">Supply Chain</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owning or Issuing Organization/Site type
                    </label>
                    <div className="relative">
                      <select
                        value={formData.owningOrIssueingOrganization}
                        onChange={(e) =>
                          handleInputChange(
                            "owningOrIssueingOrganization",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Site">Site</option>
                        <option value="Regional">Regional</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related PEGA Change
                    </label>
                    <input
                      type="text"
                      value={formData.relatedPEGAChange}
                      onChange={(e) =>
                        handleInputChange("relatedPEGAChange", e.target.value)
                      }
                      placeholder="Explain PEGA changes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Number
                    </label>
                    <input
                      type="text"
                      value={formData.projectNumber}
                      onChange={(e) =>
                        handleInputChange("projectNumber", e.target.value)
                      }
                      placeholder="Enter project number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Affected Manufacturing/Sterilization Site(s)*{" "}
                      {errors.affectedManufacturingSites && (
                        <span className="text-red-500">Required</span>
                      )}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.affectedManufacturingSites}
                        onChange={(e) =>
                          handleInputChange(
                            "affectedManufacturingSites",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none ${
                          errors.affectedManufacturingSites
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Juncos Manufacturing">
                          Juncos Manufacturing
                        </option>
                        <option value="San Lorenzo Sterilization">
                          San Lorenzo Sterilization
                        </option>
                        <option value="Cidra Manufacturing">
                          Cidra Manufacturing
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Affected Sites Details
                    </label>
                    <input
                      type="text"
                      value={formData.affectedSitesDetails}
                      onChange={(e) =>
                        handleInputChange(
                          "affectedSitesDetails",
                          e.target.value
                        )
                      }
                      placeholder="Explain affected sites"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Change Control Determination Optional Approvers
                  </label>
                  <div className="relative">
                    <select
                      value={formData.changeControlDetermination}
                      onChange={(e) =>
                        handleInputChange(
                          "changeControlDetermination",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="Quality Manager">Quality Manager</option>
                      <option value="Operations Manager">
                        Operations Manager
                      </option>
                      <option value="Technical Lead">Technical Lead</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Change Description */}
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Change Description
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current State*{" "}
                  {errors.currentState && (
                    <span className="text-red-500">Required</span>
                  )}
                </label>
                <RichTextEditor
                  value={formData.currentState}
                  onChange={(value) => handleInputChange("currentState", value)}
                  placeholder="Describe the current state..."
                  error={errors.currentState}
                  className="w-full"
                />
              </div>

              {/* Future State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Future State*{" "}
                  {errors.futureState && (
                    <span className="text-red-500">Required</span>
                  )}
                </label>
                <RichTextEditor
                  value={formData.futureState}
                  onChange={(value) => handleInputChange("futureState", value)}
                  placeholder="Describe the future state..."
                  error={errors.futureState}
                  className="w-full"
                />
              </div>
            </div>

            {/* Justification and Risk Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Justification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Justification
                </label>
                <RichTextEditor
                  value={formData.justification}
                  onChange={(value) =>
                    handleInputChange("justification", value)
                  }
                  placeholder="Explain the justification for the change..."
                  className="w-full"
                />
              </div>

              {/* Risk Assessment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Assessment
                </label>
                <RichTextEditor
                  value={formData.riskAssessment}
                  onChange={(value) =>
                    handleInputChange("riskAssessment", value)
                  }
                  placeholder="Provide a risk assessment for the change..."
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-500">* Required fields</div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Form
              </button>
            </div>
          </div>
        </div>

        {/* Tab section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("Attachments")}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "Attachments"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Attachments ({attachments.length})
              </button>
              <button
                onClick={() => setActiveTab("Audit")}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "Audit"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Audit ({auditEntries.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "Audit" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Audit Trail</h4>
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          User
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          User Role
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          User Activity
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          State
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Comments
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditEntries.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-8 text-center text-gray-500"
                          >
                            <Plus className="h-6 w-6 mx-auto mb-2" />
                            <button
                              onClick={addAuditEntry}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Add Item
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {auditEntries.map((entry) => (
                            <tr
                              key={entry.id}
                              className="border-b border-gray-100"
                            >
                              <td className="py-3 px-4">{entry.user}</td>
                              <td className="py-3 px-4">{entry.userRole}</td>
                              <td className="py-3 px-4">{entry.activity}</td>
                              <td className="py-3 px-4">{entry.date}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                  {entry.state}
                                </span>
                              </td>
                              <td className="py-3 px-4">{entry.comments}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="6" className="py-4 text-center">
                              <button
                                onClick={addAuditEntry}
                                className="text-blue-600 hover:text-blue-700 flex items-center justify-center w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Item
                              </button>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Attachments" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Attachments</h4>
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </label>
                  </div>
                </div>

                {attachments.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No attachments yet</p>
                    <label
                      htmlFor="file-upload"
                      className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer inline-block"
                    >
                      Add Attachment
                    </label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attachment.size} • Uploaded{" "}
                              {attachment.uploadDate}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="text-center pt-4">
                      <label
                        htmlFor="file-upload"
                        className="text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Attachments
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form1;
