import React, { useState } from "react";
import { ChevronDown, Edit3, Mail, Check } from "lucide-react";

const Form3 = () => {
  const [selectedCategories, setSelectedCategories] = useState({
    "Product Design Change": false,
    Sterilization: false,
    "MFG Process Change": false,
    "MFG Site Change": true,
    "Labeling & Regulatory": false,
    "Supplier MFG Site Change": true,
    "Catalog Number": false,
    "Supplier Change": false,
    "Packaging Change": false,
    Other: false,
  });

  const [approvalStates, setApprovalStates] = useState({
    Quality: { applicable: "Yes", approved: true },
    "Instrument R&D": { applicable: "No", approved: false },
    "Reagent R&D": { applicable: "Yes", approved: true },
    "Instrument Manufacturing": { applicable: "Notify", approved: false },
    "Reagent Manufacturing": { applicable: "Yes", approved: true },
    RA: { applicable: "Notify", approved: false },
    Service: { applicable: "Yes", approved: true },
    "Supply Chain Planning": { applicable: "No", approved: false },
    Procurement: { applicable: "Yes", approved: true },
    "Medical Affairs": { applicable: "Notify", approved: false },
    Marketing: { applicable: "Yes", approved: true },
    "Product Stewardship": { applicable: "No", approved: false },
    "Project Curie Rep": { applicable: "Notify", approved: false },
  });

  const departments = [
    { name: "Quality", owner: "Meera", id: "098765" },
    { name: "Instrument R&D", owner: "Thomas", id: "098787" },
    { name: "Reagent R&D", owner: "John", id: "098787" },
    { name: "Instrument Manufacturing", owner: "John", id: "098787" },
    { name: "Reagent Manufacturing", owner: "John", id: "098787" },
    { name: "RA", owner: "John", id: "098787" },
    { name: "Service", owner: "John", id: "098787" },
    { name: "Supply Chain Planning", owner: "John", id: "098787" },
    { name: "Procurement", owner: "John", id: "098787" },
    { name: "Medical Affairs", owner: "John", id: "098787" },
    { name: "Marketing", owner: "John", id: "098787" },
    { name: "Product Stewardship", owner: "John", id: "098787" },
    { name: "Project Curie Rep", owner: "John", id: "098734" },
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleApproval = (department) => {
    const currentState = approvalStates[department];
    if (currentState.applicable === "Yes") {
      setApprovalStates((prev) => ({
        ...prev,
        [department]: { ...currentState, approved: !currentState.approved },
      }));
    }
  };

  const getApplicableBgColor = (applicable) => {
    switch (applicable) {
      case "Yes":
        return "bg-blue-100";
      case "No":
        return "bg-red-100";
      case "Notify":
        return "bg-gray-100";
      default:
        return "bg-white";
    }
  };

  const getApplicableTextColor = (applicable) => {
    switch (applicable) {
      case "Yes":
        return "text-blue-700";
      case "No":
        return "text-red-700";
      case "Notify":
        return "text-gray-700";
      default:
        return "text-gray-900";
    }
  };
  const [formData, setFormData] = useState({
    gfmTemplate: "",
    gfmJustification: "",
    labelTranslations: "",
    ecoNumber: "",
    whereUsedReport: "",
    whereUsedJustification: "",
    justification: "",
    capaNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className=" p-6 bg-gray-50 h-max">
      {/* Change Category Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Change Category(s)
          </h2>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(selectedCategories).map(([category, isSelected]) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Department Assessment Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Owner*
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Owner ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept, index) => {
                const approvalState = approvalStates[dept.name];
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dept.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getApplicableBgColor(
                          approvalState.applicable
                        )} ${getApplicableTextColor(approvalState.applicable)}`}
                      >
                        {approvalState.applicable}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {approvalState.applicable === "Yes" ? (
                        <button
                          onClick={() => toggleApproval(dept.name)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            approvalState.approved
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          {approvalState.approved && (
                            <Check className="h-3 w-3" />
                          )}
                        </button>
                      ) : approvalState.applicable === "Notify" ? (
                        <Mail className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Edit3 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* UDI change management */}

      <div className="border border-gray-300 rounded-lg">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-lg font-medium text-gray-900">
            UDI Change Management Assessment
          </h1>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* First Question */}
          <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Does GFM-10159A UDI-DI Change Assessment Template need to be
              completed?
            </h2>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm text-gray-700">
                Select "No" for any of the following out of scope changes: RUO,
                cosmetic changes, like-for-like (without raw material changes or
                SW/firmware), label layout change (without label content
                change), manufacturing process or QC control change not causing
                change to finished good specifications.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="gfmTemplate"
                  value="no"
                  checked={formData.gfmTemplate === "no"}
                  onChange={(e) =>
                    handleInputChange("gfmTemplate", e.target.value)
                  }
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">No</span>
                  <p className="text-sm text-gray-600 mt-1">
                    (Enter justification) This change does not impact the
                    manufacturing process and will not cause changes to finished
                    goods specifications
                  </p>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="gfmTemplate"
                  value="yes"
                  checked={formData.gfmTemplate === "yes"}
                  onChange={(e) =>
                    handleInputChange("gfmTemplate", e.target.value)
                  }
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Yes</span>
                  <p className="text-sm text-gray-600 mt-1">
                    (Originator is responsible for completing GFM-10159A UDI-DI
                    Change Assessment Template for each SKU licensed as IVD in
                    any country to determine if the change will trigger a BUDI
                    or GTIN update. RA SME is responsible for providing guidance
                    and input as needed for originator to complete the
                    checklist.) Completed Checklist must be attached to ACR.
                  </p>
                </div>
              </label>
            </div>

            {formData.gfmTemplate === "no" && (
              <div className="mt-4">
                <textarea
                  value={formData.gfmJustification}
                  onChange={(e) =>
                    handleInputChange("gfmJustification", e.target.value)
                  }
                  placeholder="Enter justification..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
            )}
          </div>

          {/* Label Translations Question */}
          <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Will label translations be part of the change?
            </h2>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="labelTranslations"
                  value="no"
                  checked={formData.labelTranslations === "no"}
                  onChange={(e) =>
                    handleInputChange("labelTranslations", e.target.value)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">No</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="labelTranslations"
                  value="yes"
                  checked={formData.labelTranslations === "yes"}
                  onChange={(e) =>
                    handleInputChange("labelTranslations", e.target.value)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">
                  Yes (provide ECO number(s))
                </span>
              </label>
            </div>

            {formData.labelTranslations === "yes" && (
              <div className="mt-4">
                <input
                  type="text"
                  value={formData.ecoNumber}
                  onChange={(e) =>
                    handleInputChange("ecoNumber", e.target.value)
                  }
                  placeholder="Enter ECO number(s)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Where-Used Report Question */}
          <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Where-Used Report Attached (ZBOMEXP):
            </h2>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="whereUsedReport"
                  value="na"
                  checked={formData.whereUsedReport === "na"}
                  onChange={(e) =>
                    handleInputChange("whereUsedReport", e.target.value)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">
                  N/A (Justification required below)
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="whereUsedReport"
                  value="no"
                  checked={formData.whereUsedReport === "no"}
                  onChange={(e) =>
                    handleInputChange("whereUsedReport", e.target.value)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">No</span>
              </label>
            </div>

            {formData.whereUsedReport === "na" && (
              <div className="mt-4">
                <textarea
                  value={formData.whereUsedJustification}
                  onChange={(e) =>
                    handleInputChange("whereUsedJustification", e.target.value)
                  }
                  placeholder="Enter justification..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
            )}
          </div>

          {/* Justification Section */}
          <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Justification
            </h2>

            <div className="border border-gray-300 rounded-md">
              {/* Toolbar */}
              <div className="flex items-center space-x-1 p-2 border-b border-gray-300 bg-gray-50">
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Font</option>
                </select>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Size</option>
                </select>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded font-bold text-sm">
                    B
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded italic text-sm">
                    I
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded underline text-sm">
                    U
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={formData.justification}
                onChange={(e) =>
                  handleInputChange("justification", e.target.value)
                }
                className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 resize-none"
                rows="6"
                placeholder="Enter justification..."
              />
            </div>
          </div>

          {/* CAPA or QN Number */}
          <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">
              CAPA or QN Number:
            </h2>

            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="capaNumber"
                  value="na"
                  checked={formData.capaNumber === "na"}
                  onChange={(e) =>
                    handleInputChange("capaNumber", e.target.value)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">N/A</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form3;
