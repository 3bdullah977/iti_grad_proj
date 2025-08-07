import { Router } from "express";
import authRoutes from "./auth.mjs";
import userData from "./userData.mjs";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api", userData);

export default router;
