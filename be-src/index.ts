import { sequelize} from "../be-src/models/conn";
import {User, Product, Auth} from "../be-src/models/index"
import * as express from "express";
import * as crypto from "crypto";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import { createProduct, createProfile, updateProfile, getProfile } from "./controllers/user-controller";





const app = express();
app.use(express.json());

function getSHA256ofString(text:string){
    return crypto.createHash('sha256').update(text).digest('hex')
}

const port = process.env.PORT || 3003;


const SECRET = "asdasdasdsad2211"


// app.post("/auth", async (req, res)=>{
//      const [user, created] = await User.findOrCreate({
//         where:{
//             email: req.body.email   
//         },
//         defaults:{
//             email:req.body.email,
//             name: req.body.name,
//             birthdate: req.body.birthdate
            
//         }
        
//     }) 
    

//     const [auth, authCreated] = await Auth.findOrCreate({
//         where:{user_id: user.get("id")},
//         defaults:{
//             email: req.body.email,
//             password: getSHA256ofString(req.body.password),
//             user_id: user.get("id")
            
//         }
//     })
// 		console.log({auth, authCreated});
//         res.json(auth);
		
    
    
// })


// app.post("/auth/token", async (req, res)=>{
//     const {email, password} = req.body;
//     const passwordHasheado = getSHA256ofString(password)
//     const auth = await Auth.findOne({
//         where:{ email: req.body.email,
//             password: passwordHasheado

//         }
//     })
//     const token = jwt.sign({id: auth.get("user_id")}, SECRET);
//     if(auth){
//         res.json({
//             token
//         });
//     }else{
//         res.status(400).json("user or password incorrect");
//     }
// })


// app.get("/me", async (req, res)=>{
//     const token = req.headers.authorization.split(" ")[1];
//     const data = jwt.verify(token, SECRET);
//     res.json(data);
// })

// function authMiddleware (req, res, next){
//     const token = req.headers.authorization.split(" ")[1];
//     try{
//     const data = jwt.verify(token, SECRET);
//     req.body._user = data;
//     next();
//     }catch(e){
//         res.status(401).json("unauthorized")
//     }
// }

// app.post("/products", authMiddleware, async (req, res)=>{
//     const product = await Product.create({
//         ...req.body,
//         userId: req.body._user.id
//     })
//     res.json(product)
// })


// app.get("/me/products", authMiddleware, async (req, res)=>{
//     const product = await Product.findAll({
//         where:{
//             userId: req.body._user.id
//         },
//         include:[User]
//     })
//     res.json(product)
// })

app.post("/create", async (req, res)=>{
    if(!req.body){
        res.status(400).json({
            message: "no hay datos en el body"
        })
    }
    const newProfile = await createProfile(1, req.body)
    res.json(newProfile)
})

app.post("/profile", async (req, res)=>{
    if(!req.body){
        res.status(400).json({
            message: "no hay datos en el body"
        })
    }
    const newProfile = await updateProfile(1, req.body)
    res.json(newProfile)
})


app.get("/profiles", async (req, res)=>{
    const profiles = User.findAll();
    res.json(profiles);
})

app.get("/profile", async (req, res)=>{
    const profileFound = await getProfile(1);
    console.log(profileFound);
    res.json(profileFound);
})

const staticPath = path.resolve(__dirname, "../fe-src");
app.use(express.static(staticPath));

app.get("*", function(req, res){
    
    res.sendFile(staticPath + "/index.html");
})
  
app.listen(port, ()=>{
      console.log("todo ok, corriendo en", port);
  })