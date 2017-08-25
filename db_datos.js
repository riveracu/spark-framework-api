import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

let db = null;

module.exports = app =>{
    if(!db){
        const datos = app.libs.datos;
        const sequelize = new Sequelize(
            datos.database,
            datos.username,
            datos.password,
            datos.params
        );
        db = {
            sequelize,
            Sequelize
        };
    }
    return db;
};