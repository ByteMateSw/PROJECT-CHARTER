import nodemailer from "nodemailer"
import dotenv from "dotenv"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },

});

export async function SendVerificationMail(direccion): Promise<string> { //se tiene que crear la variable direccion del registro de usuarios
  try {
    transporter.sendMail({
      from: '"mensaje" <emailejemplo@gmail.com>',
      to: direccion,
      subject: "Hello ✔",
      text: "Hello world?",
      html: CreateVerificationMail("token"), //aca va el token que se crea en el registro de usuarios
    })
    return "Mail enviado correctamente"
  } catch (error) {
    console.log(error);
    throw new Error("Algo salio mal")
  }
};

function CreateVerificationMail(token): string {
  return '<p>Si te llego este mail es para verificar tu cuenta, entrá acá <a href= "http://localhost:4000/verificar/${token}" blehh </p>'
}



