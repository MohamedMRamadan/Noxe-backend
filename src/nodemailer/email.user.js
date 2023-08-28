import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const sendEmail = async (opt) => {
  const token = jwt.sign({ email: opt.email }, process.env.SECRET_KEY);

  opt.token = token;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedmanchinooz@gmail.com",
      pass: "pmmsdgkqvfblijcx",
    },
  });
  let info = await transporter.sendMail({
    from: `"Mohamed Ramadan 💙"<mohamedmanchinooz@gmail.com>`,
    to: opt.email,
    subject: opt.subj,
    html: opt.message(opt),
  });

  console.log(info);
  if (opt.type === "reset")
    return `/password/recover/?u=${opt.id}&n=&fi=default_recover&tk=${opt.token}`;
};

export default sendEmail;
