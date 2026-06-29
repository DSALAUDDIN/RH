import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // Create a secure SMTP transporter
    // Explicit SMTP configuration prevents 45-second IPv6 DNS timeouts on Windows
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'drhasan07012@gmail.com', // Sending the form to the main clinic email
      replyTo: email, // Lets the clinic directly reply to the user's email
      subject: `New Website Inquiry: ${name}`,
      text: `
        You have received a new consultation request from your website!
        
        Client Details:
        ---------------
        Name  : ${name}
        Email : ${email}
        Phone : ${phone}
        
        Message:
        --------
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0f172a; margin-bottom: 10px;">New Consultation Request</h2>
          <p style="color: #475569; margin-bottom: 20px;">You have received a new message from the <strong>RH Dental Care</strong> website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; width: 100px;"><strong>Name</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><strong>Email</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><strong>Phone</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${phone}</td>
            </tr>
          </table>
          
          <h3 style="color: #0f172a; margin-top: 20px; margin-bottom: 10px;">Message:</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #334155;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Nodemailer backend error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while sending email.' },
      { status: 500 }
    );
  }
}
