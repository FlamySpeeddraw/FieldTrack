import cron from 'node-cron';
import { archiveOldInterventions } from './archive.js';

cron.schedule('* * * * *', () => {
    console.log('Début de l’archivage...');
    archiveOldInterventions();
});