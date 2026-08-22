const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "construction_db"
});

// Connect to MySQL with retry
function connectDatabase() {
    db.connect((err) => {
        if (err) {
            console.log("MySQL not ready. Retrying in 5 seconds...");
            setTimeout(connectDatabase, 5000);
            return;
        }

        console.log("MySQL database connected successfully!");
    });
}

connectDatabase();


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
