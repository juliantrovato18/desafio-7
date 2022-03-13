import { Pet } from "../models/pets";
import { Reporte } from "../models/reportes";
import { User } from "../models";
import {index} from "../lib/algolia"
import { v2 } from "cloudinary";
import { cloudinary } from "../lib/cloudinary";
import { where } from "sequelize/dist";


//crear una mascota
export async function createPet(userId, data){
    

    if(data.petImage){
        const imagen = await cloudinary.uploader.upload(data.petImage,{
            resource_type: "image",
            discard_original_filename: true,
            width: 100
        })

    const pet = await Pet.create({
        petname: data.petname,
        petImage:imagen.secure_url,
        place:data.place,
        lat: data.lat,
        lng: data.lng,
        user_id: userId
    })

    

        await pet.update({
            petname: data.petname,
            petImage:imagen.secure_url,
            place:data.place,
            lat: data.lat,
            lng: data.lng,
            user_id: userId
        },{
            where:{
                id: userId
            }
        })
    
    
    const algoliaPet =  index.saveObject({
        
        petname: data.petname,
        petImage:imagen.secure_url,
        place: data.place,
        _geoloc:{
            lat: data.lat,
            lng: data.lng
        },
        objectID:userId,
    }).then(res=>{
        console.log("res",res);
    }).catch(e=>{
        console.log(e);
    })

    
    return pet;
}
}

// busca una mascota 
export async function findPet(id){
    const petFounded = Pet.findOne({
        where:{
            id: id
        }
    })
    return petFounded
}

//busca todas las mascotas
export async function findAllPets(){
    const allPets = Pet.findAll();
    
    return allPets
}

//editar mascota perdida
export async function updatePet(body, id?){
    const respuesta:any =  {}

    if(body.petname){
        respuesta.petname = body.petname
    }
    if(body.petImage){
        respuesta.petImage = body.petImage
    }
    if(body.lat){
        respuesta.lat = body.lat
    }
    if(body.lng){
        respuesta.lng = body.lng
    }
    
    if(body.objectID){
        respuesta.objectID = id
    }
    

    // const actu = await Pet.update({
    //     petname: body.petname,
    //     petImage:body.petImage,
    //         lat: body.lat,
    //         lng: body.lng,
    // },{
    //     where:{
    //         id: id
    //     }
    // })



    // const actualizado = await Pet.update({
    //     petname: body.petname,
    //     petImage:body.petImage,
    //         lat: body.lat,
    //         lng: body.lng,
    //         id:id,
    // },{
    //     where:{
    //         id: id
    //     }
    // })

    // const bodyChange = index.partialUpdateObject({
    //     petname: body.petname,
    //     petImage:body.petImage,
    //     _geoloc:{
    //         lat: body.lat,
    //         lng: body.lng
    //     },
    //     objectID:id,
    // }).then((res)=>{
    //     console.log(res, "res");
    // }).catch((e)=>{
    //     console.log(e);
    // })


    return respuesta
}


//busca las mascotas que el usuario reporto
export async function findMyPets(userId){
    const petsFounded = Pet.findAll({
        where:{
            user_id: userId
        }
    })
    return petsFounded
}




//eliminar reporte de la mascota
export async function deleteReport(id){
    const petFounded = await Pet.findByPk(id);
    await petFounded.destroy();
    await index.deleteObject(id);

    return petFounded;
}