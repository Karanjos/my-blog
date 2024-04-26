import mongoose from "mongoose";

const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
        currentlyPursuing: { type: Boolean },
        gpa: { type: Number },
      },
    ],
    workExperience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date, default: null },
        currentlyWorking: { type: Boolean },
        jobDescription: { type: String },
      },
    ],
    skills: [{ type: String }],
    certifications: [
      {
        name: { type: String },
        issuingOrganization: { type: String },
        issueDate: { type: Date },
        expirationDate: { type: Date, default: null },
      },
    ],
    resume: { type: String },
    linkedinProfile: { type: String },
    portfolio: { type: String },
    jobPreferences: {
      preferredLocations: [{ type: String }],
      preferredIndustries: [{ type: String }],
      preferredJobTypes: [{ type: String }],
      expectedSalary: { type: Number },
    },
    projects: [
      {
        title: { type: String },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date, default: null },
        link: { type: String },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;


