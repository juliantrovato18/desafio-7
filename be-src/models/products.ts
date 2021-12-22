import {Model, DataTypes} from "sequelize";
import { sequelize } from "../models/conn";



export class Product extends Model {}
Product.init({
  title: DataTypes.STRING,
  price: DataTypes.INTEGER
}, { sequelize, modelName: 'Product' });