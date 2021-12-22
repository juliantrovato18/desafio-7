import {Product} from "./products";
import { User } from "./users";
import {Auth} from "./auth";


User.hasMany(Product);
Product.belongsTo(User);

export {Product, User, Auth};