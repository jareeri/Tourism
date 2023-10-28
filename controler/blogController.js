const express = require("express");
const db = require("../db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

const bcrypt = require("bcrypt");

app.get("/blogs", async (req, res) => {
    try {
      const query = "SELECT id, author_name, title, content FROM Blogs";
      const result = await db.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.post("/addblogs", async (req, res) => {
    try {
      const { title, content, author_id, author_name, blogimg, city } = req.body;
      const query = `
        INSERT INTO Blogs (title, content, author_id, author_name, blogimg, city)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`;
      const values = [title, content, author_id, author_name, blogimg, city];
      const result = await db.query(query, values);
      res.status(201).json({
        message: "Blog created successfully",
        blogId: result.rows[0].id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.get("/blogs/:id", async (req, res) => {
    try {
      // Extract the blog ID from the request parameters
      const blogId = req.params.id;
  
      // Query the database to fetch the blog with the specified ID
      const query =
        "SELECT id, author_name, title, content FROM Blogs WHERE id = $1";
      const values = [blogId];
  
      const result = await db.query(query, values);
  
      // Check if a blog with the specified ID exists
      if (result.rows.length === 1) {
        // Blog found, return it as JSON
        res.json(result.rows[0]);
      } else {
        // Blog not found, return a 404 status and an error message
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.put("/blogs/:id", async (req, res) => {
    try {
      // Extract the blog ID from the request parameters
      const blogId = req.params.id;
  
      // Extract the updated data from the request body
      const { title, content, author_name, blogimg, city } = req.body;
  
      // Query the database to update the blog with the specified ID
      const query = `
          UPDATE Blogs
          SET title = $1, content = $2, author_name = $3, blogimg = $4, city = $5
          WHERE id = $6
          RETURNING id`;
  
      const values = [title, content, author_name, blogimg, city, blogId];
  
      const result = await db.query(query, values);
  
      // Check if a blog with the specified ID was updated
      if (result.rows.length === 1) {
        // Blog updated successfully, return a success message and the updated blog's ID
        res
          .status(200)
          .json({
            message: "Blog updated successfully",
            blogId: result.rows[0].id,
          });
      } else {
        // Blog not found, return a 404 status and an error message
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.delete("/blogs/:id", async (req, res) => {
    try {
      // Extract the blog ID from the request parameters
      const blogId = req.params.id;
  
      // Implement the database query to delete the blog with the specified ID
      const query = "DELETE FROM Blogs WHERE id = $1";
      const values = [blogId];
  
      // Execute the delete query
      await db.query(query, values);
  
      // Return a success message
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  module.exports = app;