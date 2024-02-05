import { error, info } from "console";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "tobybecerra04@gmail.com",
      pass: "papu123",
    },

});

export async function EnviarMailVerificación() {

    const info = await transporter.sendMail({
      from: '"no lo sonieee👻" <jackelmaldito1@mailinator>', // sender address
      to: "jackelmaldito3@mailinator", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
};



