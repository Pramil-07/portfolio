import express, { type NextFunction, type Request, type Response } from "express";
import path from "path";
import { env } from "./config/env";
import chatRouter from "./routes/chat";
import healthRouter from "./routes/health";

const app = express();
const distPath = path.resolve(__dirname, "../../dist");

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));

app.use("/api/health", healthRouter);
app.use("/api/ai/chat", chatRouter);

app.use(express.static(distPath));

app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
});

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
    void next;
    console.error("[server] unhandled error", error);
    res.status(500).json({ error: "Unexpected server error. Please try again." });
});

app.listen(env.PORT, () => {
    console.log(`[server] running on port ${env.PORT}`);
});
