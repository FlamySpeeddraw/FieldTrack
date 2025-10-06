import fs from 'fs';
import path from 'path';

export const logMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration} ms)\n`;

        console.log(log);

        const logDir = path.resolve('logs');
        const logPath = path.join(logDir, 'app.log');

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        fs.appendFileSync(logPath, log);
    });

    next();
};
