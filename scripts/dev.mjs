import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm" : "npm";

function startProcess(label, args) {
    const child = spawn(npmCommand, args, {
        stdio: "inherit",
        shell: isWindows,
        windowsHide: false,
    });

    child.on("exit", (code, signal) => {
        if (signal) {
            console.log(`[dev] ${label} exited from signal ${signal}`);
            return;
        }

        if (code && code !== 0) {
            console.error(`[dev] ${label} exited with code ${code}`);
            process.exitCode = code;
        }
    });

    child.on("error", (error) => {
        console.error(`[dev] failed to start ${label}`, error);
        process.exitCode = 1;
    });

    return child;
}

const server = startProcess("server", ["run", "dev:server"]);
const client = startProcess("client", ["run", "dev:client"]);

function shutdown(signal) {
    for (const child of [server, client]) {
        if (!child.killed) {
            child.kill(isWindows ? undefined : signal);
        }
    }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
