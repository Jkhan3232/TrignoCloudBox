"use strict"


const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");

const hbs = require("hbs");
require("./database/connect");
const cookie = require("cookie-parser");

app.use(express.static('public'))
const view_Path = path.join(__dirname, "../templates/views");
console.log(view_Path);
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", view_Path);
const router = require('./routers/route');
app.use(router)
// hbs.registerPartials(paritals);



app.listen(port, () => {
  console.log(`lisining port no. ${port}`);
});
