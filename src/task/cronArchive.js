const cron = require('node-cron');
const { archiveOldInterventions } = require('./archive');

cron.schedule('* * * * *', () => {
    console.log('Début de l’archivage...');
    archiveOldInterventions();
});