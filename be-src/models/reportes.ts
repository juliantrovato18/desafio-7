import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class Reporte extends Model {}
Reporte.init({
  location: DataTypes.STRING,
  petName: DataTypes.STRING,
  petClass: DataTypes.STRING,
  when: DataTypes.INTEGER
}, { sequelize, modelName: 'Reporte' });