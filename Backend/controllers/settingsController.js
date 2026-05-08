import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings.focusTime = req.body.focusTime;
      settings.shortBreak = req.body.shortBreak;
      settings.longBreak = req.body.longBreak;

      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};