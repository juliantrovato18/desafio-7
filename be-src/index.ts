import { sequelize} from "../be-src/models/conn";
import {User, Pet, Auth} from "../be-src/models/index"
import { createReport } from "./controllers/reporte-controller";
import * as express from "express";
import * as crypto from "crypto";
import * as cors from "cors";
import * as path from "path";
import *as jwt from "jsonwebtoken"
import { createPet, sendEmail, findPet, findMyPets, findAllPets, updatePet, deleteReport } from "./controllers/pets-controller";
import { createAuth, createUser, findToken} from "./controllers/user-controller";
import { index } from "./lib/algolia";
import { EmailAddress } from "@sendgrid/helpers/classes";





const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "asdasdasdsad2211"

const port = process.env.PORT || 3003;



app.use(express.json({ limit: "75mb" }));






//Signup
app.post("/auth", async (req, res)=>{
    if(!req.body){
        res.status(400).json({
            message: "no hay datos en el body"
        })
    }
    console.log(req.body);
    const newUser = await createUser(req.body);
    const newAuth = await createAuth(newUser.get("id"),req.body);
    const data = {
            email:newAuth.getDataValue("email"),
            name: newUser.getDataValue("name"),
            userId:newAuth.getDataValue("id")
        }

    
    res.json(data);
})


//Signin
app.post("/auth/token", async (req, res)=>{
    const auth = await findToken(req.body);
    if(auth){
        res.json(auth);
    }else{
        res.status(400).json({
            message: "user or pass are incorrect"
        })
    }
})

 function  authMiddleware(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    try{
        const data = jwt.verify(token, SECRET)
        req._user = data
        next();
    }catch(e){
        res.status(401).json({error:"unauthorized"})
    } 
}


//me 
app.get("/me", authMiddleware, async (req,res)=>{
        const findUser = await User.findByPk(req._user.id)
        res.json(findUser);
})


//crea una mascota en la base de datos
app.post("/pet", authMiddleware, async (req, res)=>{

    try {
        if(!req._user.id){
            res.status(400).json("unauthorized");
        }else{
            const pet = await createPet(req._user.id ,req.body)
            res.json(pet);
        }
    } catch (err) {
        console.log(err);
    }
    
})

//busca una mascota
app.get("/pet/:id", authMiddleware, async (req,res)=>{
    if(!req.params.id){
        res.status(400).json("unauthorized");
    }else{
        const pet = await findPet(req.params.id)
        res.json(pet);
    }
})


//busca todas las mascotas
app.get("/pets", authMiddleware, async (req,res)=>{
    if(!req._user.id){
        res.status(400).json("unauthorized");
    }else{
        const pets = await findAllPets()
        res.json(pets);
    }
})


//busca las reportadas del usuario
app.get("/mypets/:id", authMiddleware, async (req,res)=>{
    if(!req._user.id){
        res.status(400).json("unauthorized");
    }else{
        const pets = await findMyPets(req._user.id)
        res.json(pets);
    }
})



//modifica una mascota ya existente
app.patch("/pets/:id", authMiddleware, async (req, res)=>{
    try {
        const [updatedPet] = await Pet.update(req.body,{
            where:{
                id:req.params.id
            }
        })
        
         const indexItem = await updatePet(req.body);
        const algoliaRes = await index.saveObject({
            ...indexItem, 
            objectID:req.params.id
        });
         
        const petUpdateada = await Pet.findOne({
            where:{
                id:req.params.id
            }
        });

        res.json(petUpdateada)
    } catch (er) {
        console.log(er)
    }
    

})

//Elimina el reporte de la mascota
app.delete("/delete-report/:id", authMiddleware, async (req,res)=>{
    try {
        
        const reportDeleted = await deleteReport(req.params.id)
        
    res.json({message: "reporte eliminado"})
    } catch (err) {
        console.log(err);
    }
    
})

//Reporta la mascota vista (REPORTS)
app.post("/report", authMiddleware, async (req, res)=>{
    if(!req._user.id){
        res.status(400).json({
            message: "no hay datos"
        })
    }else{

        try {
            const reporte = await createReport(req.body, req._user.id);
            res.json(reporte);
        } catch (err) {
            console.log(err);
        }
    }
    
    
})


//probando Report
app.post("/report-founded/:id", authMiddleware, async (req, res)=>{
    try {
        
        const {loc} = req.body;
        const {phoneNumber} = req.body;
        const {id} = req.params
        const mail = await sendEmail(loc, phoneNumber, id);
    
         res.json(mail);
    } catch (err) {
        console.log(err);
    }
})



// Busca las mascotas, cerca de su locacion
app.get("/mascotas-cerca", async (req,res)=>{
    const {lat, lng} = req.query;
    const {hits} = await index.search("",{
        aroundLatLng : [lat, lng].join(","),
        aroundRadius: 10000
    })
    res.json(hits);
})





const relativeRoute = path.resolve(__dirname + "../../dist");
app.use(express.static(relativeRoute));

// const staticPath = path.resolve(__dirname, "../fe-src");
// app.use(express.static(staticPath));

app.get("*", function(req, res){
    
    res.sendFile(relativeRoute + "/index.html");
})
  
// app.get("*", express.static(__dirname + "./../index.html"))

app.listen(port, ()=>{
      console.log("todo ok, corriendo en", port);
  })