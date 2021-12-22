import { User, Product} from "../models";
import { cloudinary } from "../lib/cloudinary";
import { where } from "sequelize/dist";


export async function createProduct(userId:number, productData) {
    return productData
}


export async function createProfile(userId, dataProfile){
    
        const prof = await User.create({
            id:userId,
            nombre: dataProfile.nombre,
            bio: dataProfile.bio,
            pictureDataURL: dataProfile.pictureDataURL,
            
            
            
        })
        return prof
    
    
}

export async function updateProfile(userId ,updateData){
    if(updateData.pictureDataURL){
        const imagen = await cloudinary.uploader.upload(updateData.pictureDataURL,
            {
                resource_type: "image",
                discard_original_filename: true,
                width: 100,

            }
        )
        const updateDataComplete = {
            nombre:updateData.nombre,
            bio:updateData.bio,
            pictureDataURL: imagen.secure_url
        };
        await User.update(updateDataComplete
            ,{
            where: {
                id: userId
            }
          });
        
          return updateDataComplete
    }
   
}

export async function getProfile(userId){
    const profileFound = await User.findByPk(userId);
    
    return profileFound
}