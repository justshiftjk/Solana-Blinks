import express from 'express'
const router = express.Router();

import { mintBlinkURL, mintMasterKey, mintSuccess, burnBlinkURL, burnCollecterKey, OPTIONS } from "../controllers/blinkController";

router.get("/mint", mintBlinkURL);

router.post("/mint", mintMasterKey);

router.options("/mint", OPTIONS);

router.post("/mint-success", mintSuccess);

router.get("/burn", burnBlinkURL);

router.post("/burn", burnCollecterKey);

router.options("/burn", OPTIONS);

export default router
