import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@reverie.dk',
    pass: 'cyBw2sevXQCW$X82'
  }
});

app.post('/api/send-status-update', async (req, res) => {
  const { to, claimNumber, newStatus } = req.body;
  try {
    await transporter.sendMail({
      from: '"Warranty Claims" <noreply@reverie.dk>',
      to: to,
      subject: `Warranty Claim #${claimNumber} Status Update`,
      text: `Your warranty claim #${claimNumber} has been updated. New status: ${newStatus}`,
      html: `<p>Your warranty claim #${claimNumber} has been updated.</p><p>New status: <strong>${newStatus}</strong></p>`
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});