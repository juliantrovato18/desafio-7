import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class User extends Model {}
User.init({
  nombre: DataTypes.STRING,
  bio: DataTypes.STRING,
  pictureDataURL: DataTypes.STRING
 
}, { sequelize, modelName: 'user' });