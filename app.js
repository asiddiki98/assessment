const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const db = require("./config/keys").mongoURI;
const User = require("./models/User");
const bodyParser = require("body-parser");


mongoose
    .connect(db, { useNewUrlParser: true})
    .then(() => console.log("connected to db"))
    .catch(err => {console.log(err)});


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello a/A")
})

app.use("/api/users",users)

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

