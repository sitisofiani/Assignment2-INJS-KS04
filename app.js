const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",require("./router/index"));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
    });
});


app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}`);
    });