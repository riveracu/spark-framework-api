import express from "express";
import consign from "consign";

const app = express();
consign()
    .include("libs/config.js")
    .then("libs/datos.js")
    .then("db_config.js")
    .then("db_datos.js")
    .then("libs/middlewares.js")
    .then("rutas")
    .then("libs/boot.js")
    .into(app);



