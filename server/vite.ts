import { type Express, Request, Response, NextFunction } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // HMR için Vite middleware
  app.use("/vite-hmr", vite.middlewares);
  
  // Vite middleware wrapper: API route'larını atla
  const viteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl || req.url || "";
    
    // API route'larını kesinlikle atla
    if (url.startsWith("/api")) {
      return next();
    }
    
    // Vite middleware'lerini kullan (static dosyalar, JS modülleri, vs.)
    vite.middlewares(req, res, next);
  };
  
  // Vite middleware'lerini ekle (static dosyalar için)
  app.use(viteMiddleware);
  
  // Catch-all route: HTML sayfaları için (API route'ları hariç)
  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl || req.url || "";

    // API route'larını kesinlikle atla
    if (url.startsWith("/api")) {
      return next();
    }
    
    // HMR route'larını atla
    if (url.startsWith("/vite-hmr")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
