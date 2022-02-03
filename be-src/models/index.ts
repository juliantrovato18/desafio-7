import {Pet} from "./pets";
import { User } from "./users";
import {Auth} from "./auth";
import {Reporte} from "./reportes"

User.hasMany(Pet);
User.hasMany(Reporte);
User.hasOne(Auth);
Pet.belongsTo(User);
Reporte.belongsTo(Pet);
Reporte.belongsTo(Auth);
Reporte.belongsTo(User);
Auth.belongsTo(User);

export {Pet, User, Auth, Reporte};