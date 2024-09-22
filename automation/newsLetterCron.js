import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running cron automation");

        try {
            const jobs = await Job.find({ newsLetterSend: false });
            if (!jobs || jobs.length === 0) {
                console.log("No jobs found for newsletter sending.");
                return;
            }

            for (const job of jobs) {
                console.log(`Processing job: ${job.title}`);

                const filteredUsers = await User.find({
                    $or: [
                        { "niches.firstNiche": job.jobNiche },
                        { "niches.secondNiche": job.jobNiche },
                        { "niches.thirdNiche": job.jobNiche }
                    ]
                });

                if (!filteredUsers || filteredUsers.length === 0) {
                    console.log(`No users found for niche: ${job.jobNiche}`);
                    continue;
                }

                for (const user of filteredUsers) {
                    try {
                        if (!user.email) {
                            console.error(`User email not defined for user: ${user.name}`);
                            continue;  // Skip this user if email is not defined
                        }

                        // Log user email and job details for debugging
                        console.log(`Sending email to: ${user.email} for job: ${job.title}`);

                        const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
                        const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted.\n` +
                            `The position is for a ${job.title} with ${job.company}, and they are looking to hire immediately.\n\n` +
                            `Job Details:\n- Position: ${job.title}\n- Company: ${job.company}\n- Location: ${job.location}\n- Salary: ${job.salary}\n\n` +
                            `Don’t wait too long! Job openings like these are filled quickly.\n\nBest Regards,\nNicheNest Team`;

                        // Send the email
                        await sendEmail(user.email, subject, message);
                    } catch (emailError) {
                        console.error(`Failed to send email to ${user.email}:`, emailError);
                    }
                }

                // Mark job as newsletter sent
                job.newsLetterSend = true;
                await job.save();
            }
        } catch (error) {
            console.error("ERROR IN NODE CRON CATCH BLOCK:", error);
        }
    });
};
