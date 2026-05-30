import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 5500);
const root = process.cwd();

const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};

createServer(async (request, response) => {
    try {
        const url = new URL(request.url, `http://${request.headers.host}`);
        const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
        const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
        const filePath = join(root, safePath);
        const body = await readFile(filePath);
        response.writeHead(200, {
            "Content-Type": types[extname(filePath)] || "application/octet-stream",
            "Cache-Control": "no-store",
        });
        response.end(body);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Arquivo nao encontrado.");
    }
}).listen(port, "127.0.0.1", () => {
    console.log(`Discipline System rodando em http://127.0.0.1:${port}`);
});
