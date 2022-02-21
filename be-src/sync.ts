import { sequelize } from "./models/conn";
import {User, Pet, Auth, Reporte} from "./models/index"


//  User.sequelize.sync({alter:true}).then((res)=>{
//         console.log(res);
//     })
    Pet.sequelize.sync({force:true}).then((res)=>{
        console.log(res);
    })
    // Auth.sequelize.sync({force:true}).then((res)=>{
    //     console.log(res);
    // })
    // Reporte.sequelize.sync({force:true}).then((res)=>{
    //     console.log(res);
    // })