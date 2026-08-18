const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Construction Project Backend is Running!");
});

app.get("/projects", (req, res) => {

    const projects = [
        {
            id: 1,
            name: "Chennai Mall Construction",
            location: "Chennai",
            progress: 65,
            budget: 5000000
        },
        {
            id: 2,
            name: "Residential Building",
            location: "Tambaram",
            progress: 45,
            budget: 3500000
        }
    ];

    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});