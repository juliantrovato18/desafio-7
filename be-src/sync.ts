import { sequelize } from "./models/conn";
import {User} from "./models/index"


 User.sequelize.sync({alter:true}).then((res)=>{
        console.log(res);
    })