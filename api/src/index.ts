import express from "express";
import config from "config";
const PORT = config.get<number>("PORT");
const app = express();

app.use(express.json());
app.use(express.urlencoded())

app.listen(PORT, () => {
    console.log(PORT);
})