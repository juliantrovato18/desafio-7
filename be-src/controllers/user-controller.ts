import { User, Pet, Reporte, Auth} from "../models";
import { cloudinary } from "../lib/cloudinary";
import * as crypto from "crypto"
import * as jwt from "jsonwebtoken";
import "dotenv/config"


const SECRET = process.env.SECRET

function getSHA256ofString(text:string){
    return crypto.createHash('sha256').update(text).digest('hex')
}

export async function createUser(dataProfile){
            
        const [user, created] = await User.findOrCreate({
            where:{
                email:dataProfile.email,
            },
            defaults:{
                name:dataProfile.name,
                email:dataProfile.email
            }
            
            
            
        })
        console.log({user});
        return user
    
    
}

export async function findUser(id){
    const user = await User.findByPk(id);
    return user
}


export async function createAuth(userId, data){
    const [auth, authCreated] = await Auth.findOrCreate({
        where:{
            user_id:userId,
        },
        defaults:{
            email:data.email,
            password:getSHA256ofString(data.password),
            user_id:userId
        }
        
        
        
    })
    return auth
}


export async function findToken(data){
    const auth = await Auth.findOne({
        where:{
            email:data.email,
            password:getSHA256ofString(data.password),
        }
        
    })
    const token =  jwt.sign({ id: auth["user_id"] }, SECRET);
    return {token};
}



