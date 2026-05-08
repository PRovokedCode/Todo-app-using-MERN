import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },

  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const FocusSession = mongoose.model(
  "FocusSession",
  focusSessionSchema
);

export default FocusSession;