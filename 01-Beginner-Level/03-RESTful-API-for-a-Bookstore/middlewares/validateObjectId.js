import mongoose from "mongoose";

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({
      success: false,
      message: `Invalid id Format:  ${id}`,
    });

  next();
};
