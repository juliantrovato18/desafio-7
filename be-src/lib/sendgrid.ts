import "dotenv/config";
import * as sgMail from "@sendgrid/mail";

export async function sendEmail(userEmail, petname, loc, phoneNumber){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: userEmail,
  from: "trovatojulian364@gmail.com", // Use the email address or domain you verified above
  subject: `Se encontro a tu mascota:${petname}`,
  text: `tenemos informacion de ${petname}`,
  html: `<strong>encontramos a tu mascota vista en ${loc}, podes comunicarte conmigo, este es mi telefono ${phoneNumber}</strong>`,
};
//ES6
sgMail.send(msg).then(
  () => {},
  (error) => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
);

}

