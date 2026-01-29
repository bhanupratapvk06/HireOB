const cron = require('node-cron');
const Job = require('../models/Job');

const jobExpiryCron = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            await Job.updateMany({
                expiryDate: { $lt: new Date() },
                status: 'open'
            }, {
                status: 'closed'
            });
            console.log("Expired jobs closed automatically");
        } catch (error) {
            console.error("Job expiry cron error:", error);
        }
    });
}

module.exports = jobExpiryCron;