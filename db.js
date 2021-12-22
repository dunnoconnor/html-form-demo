const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

let sequelize;
if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "bin/db.sqlite",
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      timestamps: false,
    },
  });
}
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite:memory:",
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      timestamps: false,
    },
  });
}

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      timestamps: false,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

module.exports = {sequelize}