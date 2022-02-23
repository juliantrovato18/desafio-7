import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class Pet extends Model {}
Pet.init({
  petname: DataTypes.STRING,
  petImage:DataTypes.TEXT,
  place: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng:DataTypes.FLOAT,
  user_id: DataTypes.INTEGER
  
}, { sequelize, modelName: 'Pet' });