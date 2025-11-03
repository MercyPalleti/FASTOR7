import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  course_interest: String,
  status: { type: String, enum: ["public", "claimed"], default: "public" },
  claimed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
}, { timestamps: true });

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
