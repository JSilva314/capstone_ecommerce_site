const express = require("express");
const passwordResetRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const prisma = require("../client");

// Configuring nodemailer for SendGrid
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

// Request password reset
passwordResetRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("Forgot password request received for email:", email);
    const user = await prisma.users.findUnique({
      where: { email: email }, // Ensure it's querying by email
    });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).send({ message: "User not found" });
    }

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt: expiresAt,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("Reset link generated:", resetLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset</p>
             <p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
    });

    console.log("Password reset email sent to:", user.email);
    res.status(200).send({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Error in /forgot-password route:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Validate reset token
passwordResetRouter.get("/validate-token/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!passwordResetToken || passwordResetToken.expiresAt < new Date()) {
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    res.status(200).send({ message: "Token is valid" });
  } catch (error) {
    console.error("Error in /validate-token route:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Reset password
passwordResetRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log("Received reset-password request for token:", token);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!passwordResetToken || passwordResetToken.expiresAt < new Date()) {
      console.log("Invalid or expired token:", token);
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: { id: passwordResetToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { token },
    });

    console.log(
      "Password reset successful for user ID:",
      passwordResetToken.userId
    );
    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in /reset-password route:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = passwordResetRouter;
