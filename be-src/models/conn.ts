import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.USER_NAME_POSTGRE,
    password: process.env.PASSWORD_POSTGRE,
    database: process.env.DATA_BASE,
    port: 5432,
    host: process.env.HOST,
    ssl: true,
    // esto es necesario para que corra correctamente
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });