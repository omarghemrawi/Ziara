import nodemailer from "nodemailer";

export const sendDeactivationEmail = async (clientEmail, clientName) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: `"Ziara" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "Account Deactivated",
      text: `Hello ${clientName},\n\nYour account has been deactivated. If you think this is a mistake, contact support.`,
    };

    await transporter.sendMail(message);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

export const sendBannednEmail = async (clientEmail, clientName) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: `"Ziara" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "Account banned",
      text: `Hello ${clientName},\n\nYour account has been banned . If you think this is a mistake, contact support.`,
    };

    await transporter.sendMail(message);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

export const sendClientRegisterNotfication = async (clientData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Ziara" ,
      to: process.env.GMAIL_USER, // same Gmail account
      subject: "New Client Registered",
      html: `
        <h3>New Client Registration</h3>
        <p>Name: ${clientData.name}</p>
        <p>Email: ${clientData.email}</p>
        <p>Registered At: ${new Date().toLocaleString()}</p>
      `,
    });

  } catch (err) {
    console.error("Error sending email:", err);
  }
};