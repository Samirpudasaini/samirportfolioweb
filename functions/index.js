  const firebaseConfig = {
    apiKey: "AIzaSyCvlId1PNZRAh6mRmHnavm4XAKptPRZLSM",
    authDomain: "portfolio-1cb90.firebaseapp.com",
    databaseURL: "https://portfolio-1cb90-default-rtdb.firebaseio.com",
    projectId: "portfolio-1cb90",
    storageBucket: "portfolio-1cb90.firebasestorage.app",
    messagingSenderId: "446643265196",
    appId: "1:446643265196:web:736a044b025d32c3908909",
    measurementId: "G-QR2PB4M4P1"
};
  
const functions = require("firebase-functions");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    throw new functions.https.HttpsError("invalid-argument", "Missing fields");
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // or your verified domain
      to: "samirpudasaini51@gmail.com",
      subject: `Portfolio message from ${name}`,
      reply_to: email,
      html: `
        <h2>New message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("internal", "Failed to send email");
  }
});
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

const sendEmail = httpsCallable(functions, "sendContactEmail");

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();

  const messageDiv = document.getElementById("form-message");
  messageDiv.className = "form-message";
  messageDiv.textContent = "";

  try {
    const result = await sendEmail({ name, email, message });

    if (result.data.success) {
      messageDiv.textContent = "Thank you! I will get back to you as soon as possible.";
      messageDiv.classList.add("success", "visible");
      e.target.reset();
    }
  } catch (err) {
    messageDiv.textContent = "Something went wrong. Please try again.";
    messageDiv.classList.add("error", "visible");
    console.error(err);
  }
});