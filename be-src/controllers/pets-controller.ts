import { Pet } from "../models/pets";
import { Reporte } from "../models/reportes";
import { User } from "../models";
import {index} from "../lib/algolia"



//crear una mascota
export async function createPet(userId, data){
    

    const pet = await Pet.create({
        petname: data.petname,
        petImage:data.petImage,
        lat: data.lat,
        lng: data.lng,
        user_id: userId
    })

    const petId = await pet.get("id");
    const petName = await pet.get("petname");
    const petImage = await pet.get("petImage");
    const lat = await pet.get("lat");
    const lng = await pet.get("lng");
    const algoliaPet =  index.saveObject({
        objectID:petId,
        petname:petName,
        petImage:petImage,
        _geoloc:{
            lat: lat,
            lng: lng
        }
    }).then(res=>{
        console.log(algoliaPet);
        console.log(res);
    }).catch(e=>{
        console.log(e);
    })

    
    return pet;

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
    if(body.estado){
        respuesta.estado = body.estado
    }
    if(body.lat){
        respuesta.lat = body.lat
    }
    if(body.lng){
        respuesta.lng = body.lng
    }
    if(body.petClass){
        respuesta.petClass = body.petClass
    }
    if(body.objectID){
        respuesta.objectID = id
    }

    return respuesta
}

//eliminar reporte de la mascota
export async function deleteReport(id){
    const eliminarReporte = Pet.destroy({
        where:{
            id:id
        }
    })
    return eliminarReporte
}