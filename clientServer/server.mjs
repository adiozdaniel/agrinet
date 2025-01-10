import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join } from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Get the port from the environment variable, default to 8181 if not available
const PORT = process.env.PORT || 8181;

// Directory to serve
const DIST_FOLDER = join(__dirname, ".");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".scss": "text/x-scss",
  ".ico": "image/x-icon",
  ".map": "application/json",
  ".webp": "image/webp",
};

createServer(async (req, res) => {
  try {
    const reqPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = join(DIST_FOLDER, reqPath);
    const fileExt = extname(filePath);
    const mimeType = mimeTypes[fileExt] || "application/octet-stream";

    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeType });
    res.end(content);
  } catch (err) {
    // Fallback to index.html for Angular routes
    if (req.url && !extname(req.url)) {
      try {
        const indexPath = join(DIST_FOLDER, "index.html");
        const indexContent = await readFile(indexPath);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexContent);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404: File Not Found");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404: File Not Found");
    }
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
