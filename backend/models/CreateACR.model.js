import mongoose from "mongoose";

const changeRequestSchema = new mongoose.Schema(
  {
    owningGroup: { type: String, required: true }, // Manufacturer Division
    owningGroupSite: { type: String, required: true },

    changeImplementationDetails: {
      originatingSite: { type: String, required: true },
      originatingPlant: { type: String },
      changeControlCoordinator: { type: String, required: true },
      targetImplementationDate: { type: Date },
      title: { type: String, required: true },
      relatedChanges: { type: [String] }, // array of linked change IDs
      affectedBusinessUnits: { type: [String], required: true },
      owningOrIssuingOrgType: { type: String },
      projectNumber: { type: String },
      affectedManufacturingSites: { type: [String] },
      relatedPegaChange: { type: String },
      affectedSitesDetails: { type: String },
      optionalApprovers: { type: [String] },
    },

    changeDescription: {
      currentState: { type: String, required: true },
      futureState: { type: String, required: true },
      justification: { type: String, required: true },
      riskAssessment: { type: String },
    },

    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedBy: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    audit: [
      {
        user: String,
        userRole: String,
        userActivity: String,
        date: { type: Date, default: Date.now },
        state: String,
        comments: String,
      },
    ],

    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "In Review", "Approved", "Rejected", "Implemented"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export const CreateACR = mongoose.model("CreateACR", changeRequestSchema);
