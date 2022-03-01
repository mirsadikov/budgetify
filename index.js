import express from "express";
import "colors";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) console.error(err)
    console.log(`Server started on port ${PORT}`.blue.inverse);
});
