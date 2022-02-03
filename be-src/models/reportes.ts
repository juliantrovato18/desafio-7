import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class Reporte extends Model {}
Reporte.init({
  name: DataTypes.STRING,
  phoneNumber: DataTypes.INTEGER,
  when: DataTypes.STRING,
  user_id: DataTypes.INTEGER
  
}, { sequelize, modelName: 'Reporte' });