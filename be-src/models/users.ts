import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,

 
}, { sequelize, modelName: 'user' });