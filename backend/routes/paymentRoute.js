import express from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { stipeWebhook, stripeCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router()

router.post("/payment/stripe/session" , isAuthorized, stripeCheckoutSession) 
router.post("/payment/stripe/webhook" , stipeWebhook) 

export default router;