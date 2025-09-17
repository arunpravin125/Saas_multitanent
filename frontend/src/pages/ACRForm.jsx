import React, { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../component/ACR/Sidebar";
import Header from "../component/ACR/Header";
import Forms from "../component/ACR/Forms";
import Footer from "../component/ACR/Footer";

const ACRForm = () => {
  const [activeTab, setActiveTab] = useState("Attachments");
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

  const workflowSteps = [
    { id: "draft", label: "Draft", active: true },
    { id: "creation", label: "Creation", active: false },
    { id: "assessment", label: "Assessment Approval", active: false },
    { id: "initiation", label: "Initiation Approval", active: false },
    { id: "approved", label: "Approved Open", active: false },
    { id: "final", label: "Final Memo", active: false },
    { id: "closure", label: "Closure", active: false },
  ];

  const sidebarItems = [
    { icon: Calendar, active: false },
    { icon: User, active: true },
    { icon: Building, active: false },
    { icon: FileText, active: false },
    { icon: AlertCircle, active: false },
    { icon: FileText, active: false },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}

        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <div>
            {/* ACR Header Info */}
            <Header />

            {/* Workflow Steps */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mt-2">
              <div className="flex items-center justify-between">
                {workflowSteps?.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        step.active
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.label}
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-200 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <Forms />
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default ACRForm;
