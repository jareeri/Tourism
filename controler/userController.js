const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();
app.use(bodyParser.json()); // Enable JSON request body parsing

const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate the request data here
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Username, email, and password are required." });
      }
  
      // Hash the password
      const saltRounds = 10; // Adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Check if the user already exists in the database
      const userExistsQuery =
        "SELECT * FROM Users WHERE email = $1 OR username = $2";
      const userExistsValues = [email, username];
  
      const userExistsResult = await db.query(userExistsQuery, userExistsValues);
  
      if (userExistsResult.rows.length > 0) {
        return res.status(409).json({ message: "User already exists." });
      }
  
      // If the data is valid and the user doesn't exist, proceed with user registration.
      const query = `
          INSERT INTO Users (username, email, password)
          VALUES ($1, $2, $3)
          RETURNING id`;
  
      const values = [username, email, hashedPassword]; // Store the hashed password
  
      const result = await db.query(query, values);
  
      res
        .status(201)
        .json({ message: "User registered successfully", Id: result.rows[0].id });
    } catch (error) {
      // Insert the user data into the database.
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate request data
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }
  
      // Query the database to retrieve the hashed password for the provided username
      const query = "SELECT id, password FROM Users WHERE username = $1";
      const values = [username];
  
      const result = await db.query(query, values);
  
      if (result.rows.length === 1) {
        const hashedPassword = result.rows[0].password;
  
        // Verify the password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
  
        if (passwordMatch) {
          // Passwords match, user is authenticated
          res
            .status(200)
            .json({ message: "Login successful", Id: result.rows[0].id });
        } else {
          // Password is incorrect
          res.status(401).json({ message: "Invalid username or password" });
        }
      } else {
        // No matching user found
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  module.exports = router;