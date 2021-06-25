const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_utils/db");
const path = require("path");
const PORT = process.env.PORT || 5000;

const { SubjectScrapper } = require("./subject_utils/WebScrapper");

//middleware
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

app.get("/utils/scrap", async (req, res) => {
  try {
    SubjectScrapper();
    res.json("scrapping started");
  } catch (err) {
    console.error(err);
  }
});

// get all subjects

app.get("/api/getAllSubjects", async (req, res) => {
  try {
    const subjects = await pool.query("SELECT * FROM subjects");
    res.json(subjects.rows);
  } catch (err) {
    console.error(err);
  }
});

// filter subject

app.get("/api/getSubjectsFilter/:filter", async (req, res) => {
  try {
    const { filter } = req.params;
    console.log(filter);
    const subjects = await pool.query(
      "SELECT * FROM subjects WHERE LOWER(subjects.name) LIKE '%' || LOWER($1) || '%';",
      [filter]
    );
    res.json(subjects.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`connected to server on port ${PORT}`);
});
