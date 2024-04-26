import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "recruiter",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    resetPasswordExpires: {
      type: Date,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
export default Recruiter;

// Path: server/models/Recruiter.js
// Compare this snippet from server/models/Job.js:
// import mongoose from "mongoose";
//
// const JobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     company: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     salary: {
//       type: Number,
//       default: 0,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Recruiter",
//     },
//     applicants: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         status: {
//           type: String,
//           default: "Applied",
//         },
//       },
//     ],
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );
//
// const Job = mongoose.model("Job", JobSchema);
// export default Job;
//
//
