import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
});

const from = `UniLearn <${process.env.MAILER_EMAIL}>`;

const url = `https://192.168.1.121:3000/`;

const verificationMail = async (toEmail, toName, token) => {
  const subject = `Verify Your UniLearn Account`;
  const message = `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p>Dear <b style="font-weight: bold;">${toName}</b>,</p>

                    <p>Thank you for registering with <b style="font-weight: bold;">UniLearn</b>! 
                    To complete the setup of your account, we need to verify your email address.</p>

                    <p>Please click the link below to verify your account:</p>

                    <p>
                        <a style="display: inline-block; padding: 0.5rem 2rem; border: 2px solid white; 
                                color: black; text-decoration: none; font-weight: bold;" 
                        href='${url}/verify/${token}'>
                            Verify
                        </a>
                    </p>

                    <p>If you did not create this account, please disregard this email.</p>

                    <p>Best regards,</p>

                    <p>The <b style="font-weight: bold;">UniLearn</b> Admin</p>
                </body>
                `;

  const sendEmail = await transport.sendMail({
    from: from,
    to: toEmail,
    subject: subject,
    html: message,
  });

  return sendEmail;
};

export { verificationMail };
