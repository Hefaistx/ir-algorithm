import express from "express";
import documentController from "../controllers/documentController";
const router = express.Router();

router.post("/docs", documentController.docInput);
router.post("/docs/query", documentController.docQuery);
router.post("/docs/query/noclass", documentController.docQueryClass)

export default router;