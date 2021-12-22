import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    username: "rkqneiekophuak",
    password: "8ae329c0776268bdf8a8d9e381487ce448f4d53290d0f41355f39164f8ce3b47",
    database: "d7qrmjso4i69bl",
    port: 5432,
    host: "ec2-18-210-159-154.compute-1.amazonaws.com",
    ssl: true,
    // esto es necesario para que corra correctamente
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });