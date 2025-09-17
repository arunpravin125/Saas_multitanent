import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Upload,
  Plus,
} from "lucide-react";

const Form2 = () => {
  const [expandedSections, setExpandedSections] = useState({
    materialList: true,
    productList: true,
    documentList: true,
    attachments: false,
  });

  const [activeTab, setActiveTab] = useState("Attachments");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const ActionButtons = ({ showUpload = true }) => (
    <div className="flex items-center space-x-3">
      <button className="flex items-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </button>
      <button className="flex items-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <Download className="h-4 w-4 mr-2" />
        Download
      </button>
      {showUpload && (
        <button className="flex items-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </button>
      )}
    </div>
  );

  const SectionHeader = ({ title, sectionKey, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => toggleSection(sectionKey)}
      >
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div className="flex items-center space-x-4">
          <ActionButtons showUpload={sectionKey !== "attachments"} />
          {expandedSections[sectionKey] ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {expandedSections[sectionKey] && (
        <div className="border-t border-gray-200">{children}</div>
      )}
    </div>
  );

  const TableHeader = ({ columns }) => (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left">
          <input type="checkbox" className="rounded border-gray-300" />
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Select All
        </th>
        {columns.map((column, index) => (
          <th
            key={index}
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {column.required && <span className="text-red-500">*</span>}
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );

  const EmptyTableRow = ({ colSpan, onAddItem }) => (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="px-4 py-12 text-center">
          <button
            onClick={onAddItem}
            className="flex items-center justify-center mx-auto text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Add Item</span>
          </button>
        </td>
      </tr>
    </tbody>
  );

  return (
    <div className=" p-6 bg-gray-50 h-max ">
      {/* Material List Section */}
      <SectionHeader title="Material List" sectionKey="materialList">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader
              columns={[
                { name: "Current Material", required: false },
                { name: "Proposed Material", required: false },
                { name: "Relation to BD", required: false },
                { name: "Part Number of Name", required: false },
              ]}
            />
            <EmptyTableRow
              colSpan={6}
              onAddItem={() => console.log("Add material item")}
            />
          </table>
        </div>
      </SectionHeader>

      {/* Product List Section */}
      <SectionHeader title="Product List" sectionKey="productList">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader
              columns={[
                { name: "Catalog Number", required: true },
                { name: "Product Family/Line/DHF", required: false },
                { name: "Product Description", required: false },
              ]}
            />
            <EmptyTableRow
              colSpan={5}
              onAddItem={() => console.log("Add product item")}
            />
          </table>
        </div>
      </SectionHeader>

      {/* Document List Section */}
      <SectionHeader title="Document List" sectionKey="documentList">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader
              columns={[
                { name: "Drawing/Document Number", required: false },
                { name: "Site Affected", required: false },
              ]}
            />
            <EmptyTableRow
              colSpan={4}
              onAddItem={() => console.log("Add document item")}
            />
          </table>
        </div>
      </SectionHeader>

      {/* Form Action Buttons */}
      <div className="flex justify-end space-x-4 mb-8">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
          Continue
        </button>
      </div>

      {/* Attachments/Audit Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab Header */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("Attachments")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "Attachments"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Attachments
            </button>
            <button
              onClick={() => setActiveTab("Audit")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "Audit"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Audit
            </button>
            <div className="flex-1 flex justify-end items-center pr-4">
              {expandedSections.attachments ? (
                <ChevronUp
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => toggleSection("attachments")}
                />
              ) : (
                <ChevronDown
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => toggleSection("attachments")}
                />
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {expandedSections.attachments && (
          <div className="p-6">
            {activeTab === "Audit" && (
              <div>
                {/* Audit Action Buttons */}
                <div className="flex justify-end space-x-3 mb-6">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>

                {/* Audit Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Activity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          State
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Comments
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center">
                          <button className="flex items-center justify-center mx-auto text-blue-600 hover:text-blue-700 transition-colors">
                            <Plus className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">
                              Add Item
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Attachments" && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Upload className="h-12 w-12 mx-auto mb-3" />
                </div>
                <p className="text-gray-500 mb-4">No attachments uploaded</p>
                <button className="flex items-center justify-center mx-auto px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Attachment
                </button>
              </div>
            )}
          </div>
        )}

        {!expandedSections.attachments && (
          <div className="p-4 text-center text-gray-500">
            <span className="text-sm">
              Click to expand {activeTab.toLowerCase()} section
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form2;
