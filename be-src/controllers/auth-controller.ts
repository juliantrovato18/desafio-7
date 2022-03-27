import { Auth } from "../models";

//funcion que verifica que el mail ingresado exista
export async function verifyEmail(email){
    const mail = await Auth.findOne({
        where:{
            email
            
        }
        
    })
    return mail;
}