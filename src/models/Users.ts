import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    views: { type: Number, default: 1 },
    firstSeenAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", UsersSchema);
