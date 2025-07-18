const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  console.log('Running daily backup job at midnight');
  // Add your backup logic here (e.g., dump DB, upload to S3)
});
