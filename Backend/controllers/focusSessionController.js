import FocusSession from "../models/FocusSession.js";

// GET all sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await FocusSession.find().sort({
      completedAt: -1,
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE session
export const createSession = async (req, res) => {
  try {
    const session = await FocusSession.create({
      duration: req.body.duration,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE session
export const deleteSession = async (req, res) => {
  try {
    await FocusSession.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Session deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};