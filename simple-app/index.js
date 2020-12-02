const express = require("express");
const app = express();
const path = require("path");

const PORT = 4000 || process.env.NODE_ENV;

app.use(express.static(path.join(__dirname, "static")));
app.use("/", (_request, response) => {
    return response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Connected to Port: ${PORT}`));