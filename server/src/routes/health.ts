import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
    res.status(200).json({
        status: "ok",
        uptimeSeconds: Math.floor(process.uptime()),
    });
});

export default healthRouter;
