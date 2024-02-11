// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(cors());
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "ajin@1998",
//   database: "signup",
// });

// app.post("./signup", (req, res) => {
//   const sql = "INSERT INTO login('name','email','password') VALUES(?)";
//   const values = [req.body.name, req.body.email, req.body.password];
//   db.query(sql, [values], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json("data");
//   });
// });

// app.get("/hello/:name", (req, res) => {
//   const { name } = req.params;
//   res.send(`Hello, ${name}!`);
// });
// const port =  3306;
// app.listen(8081, () => {
//   console.log("Listening");
// });
const express = require("express");
const mysql = require("mysql2");

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ajin@1998",
  database: "signup",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).send("Error inserting data into database");
      return;
    }
    console.log("Data inserted successfully");
    res.status(201).send("Data inserted successfully");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(PORT);
});
