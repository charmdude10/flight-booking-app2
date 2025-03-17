import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Initialize Payment
router.post("/initialize-payment", initializePayment);

// Verify Payment
router.get("/verify-payment/:transaction_id", verifyPayment);

export default router;
