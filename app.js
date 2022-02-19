const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello a/A")
})

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

