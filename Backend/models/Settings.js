import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  focusTime: {
    type: Number,
    default: 25,
  },

  shortBreak: {
    type: Number,
    default: 5,
  },

  longBreak: {
    type: Number,
    default: 15,
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;