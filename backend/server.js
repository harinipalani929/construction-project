const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "construction_db"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL database connected successfully!");
});

// Home route
app.get("/", (req, res) => {
    res.send("Construction Project Backend is Running!");
});

// Get all projects
app.get("/projects", (req, res) => {

    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {

        if (err) {
            res.status(500).json({
                error: err.message
            });
            return;
        }

        res.json(results);
    });
});

// Add a new project
app.post("/projects", (req, res) => {

    const { name, location, progress, budget } = req.body;;

    const sql = `
        INSERT INTO projects (name, location, progress, budget)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, location, progress, budget],
        (err, result) => {

            if (err) {
                res.status(500).json({
                    error: err.message
                });
                return;
            }

            res.json({
                message: "Project added successfully!",
                id: result.insertId
            });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});