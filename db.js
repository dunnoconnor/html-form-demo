const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

// comment out development sequelize
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: path.join(__dirname, 'db.sqlite')
// })

const connectionSettings = {
    test: {dialect: 'sqlite', storage: 'sqlite::memory:'},
    dev: {dialect: 'sqlite', storage: path.join(__dirname, 'db.sqlite')},
    production: {dialect: 'postgres', protocal: 'postgres'}
}
const sequelize = process.env.NODE_ENV === 'production'
    ? new Sequelize(
        process.env.DATABASE_URL,
        connectionSettings[process.env.NODE_ENV],
        )
    : new Sequelize(connectionSettings[process.env.NODE_ENV])

module.exports = {sequelize}