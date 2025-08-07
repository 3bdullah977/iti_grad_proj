import { Router } from "express";
import UserData from "../schemas/userData.mjs";
import mongoose from "mongoose";

const router = Router();

router.post("/:userId/data", async (req, res) => {
  const { userId } = req.params;
  const { id } = req.body;

  if (typeof id !== "number") {
    return res.status(400).json({ error: "Field 'id' must be a number" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    let userData = await UserData.findOne({ userId: objectId });

    if (!userData) {
      userData = await UserData.create({
        userId: objectId,
        id: [id],
      });
    } else {
      if (!userData.id.includes(id)) {
        userData.id.push(id);
        await userData.save();
      }
    }

    res.status(200).json({ message: "ID added", data: userData });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data", details: err });
  }
});

router.get("/:userId/data", async (req, res) => {
  const { userId } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const userData = await UserData.findOne({ userId: objectId });

    if (!userData) {
      return res.status(404).json({ error: "No data found for this user" });
    }

    res.status(200).json({ data: userData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data", details: err });
  }
});

router.delete("/:userId/data/:id", async (req, res) => {
  const { userId, id } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    const userData = await UserData.findOne({ userId: objectId });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    userData.id = userData.id.filter((item) => item !== numericId);
    await userData.save();

    res.status(200).json({ message: "ID removed", data: userData });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove ID", details: err });
  }
});

export default router;
