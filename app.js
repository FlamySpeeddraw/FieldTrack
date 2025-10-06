import express from 'express';
import './tasks/cronArchive.js';
import { logMiddleware } from './middleware/logMiddleware.js';

const app = express();

app.use(logMiddleware);

app.use(express.json());

app.listen(3000, () => {});
