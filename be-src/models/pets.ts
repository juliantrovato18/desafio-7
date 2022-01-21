import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class Pet extends Model {}
Pet.init({
  petname: DataTypes.STRING,
  estado: DataTypes.BOOLEAN,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  petClass: DataTypes.STRING,
  user_id: DataTypes.INTEGER
  
}, { sequelize, modelName: 'Pet' });