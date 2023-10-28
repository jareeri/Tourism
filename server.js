const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();
app.use(bodyParser.json()); // Enable JSON request body parsing

const bcrypt = require("bcrypt");

app.get("/", async (req, res) => {
  try {
    // await db.query(
    //   `INSERT INTO users VALUES(3, 'abdullah', 'jareeri3@gm.com', 'fwqfwq')`
    // );
    const result = await db.query(
      "SELECT * FROM users INNER JOIN blogs on users.id = blogs.author_id "
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

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

//   app.delete('/blogs/:id', async (req, res) => {
//     try {
//       // Extract the blog ID from the request parameters
//       const blogId = req.params.id;

//       // Authenticate the user and get their user information (e.g., user ID or username)
//       const authenticatedUserId = req.user.id; // Replace with how you handle user authentication

//       // Query the database to check if the user is the author of the blog
//       const checkAuthorQuery = 'SELECT author_id FROM Blogs WHERE id = $1';
//       const checkAuthorValues = [blogId];

//       const authorResult = await db.query(checkAuthorQuery, checkAuthorValues);

//       if (authorResult.rows.length === 1) {
//         const authorId = authorResult.rows[0].author_id;

//         // Check if the authenticated user is the author of the blog
//         if (authenticatedUserId === authorId) {
//           // User is the author, proceed with the deletion
//           const deleteQuery = 'DELETE FROM Blogs WHERE id = $1';
//           const deleteValues = [blogId];

//           // Execute the delete query
//           await db.query(deleteQuery, deleteValues);

//           // Return a success message
//           res.status(200).json({ message: 'Blog deleted successfully' });
//         } else {
//           // User is not the author, return a 403 status (Forbidden)
//           res.status(403).json({ message: 'Permission denied: You are not the author of this blog.' });
//         }
//       } else {
//         // Blog not found, return a 404 status and an error message
//         res.status(404).json({ message: 'Blog not found' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

/////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////

// Middleware to check if a user is authenticated
function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Use the middleware to protect a route
app.get("/protected-route", authenticateUser, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.json({ message: "You have access to this protected route" });
});

// Middleware to check user role
function checkUserRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
}

// Protect a route based on user role
app.get("/admin-route", checkUserRole("admin"), (req, res) => {
  // This route can only be accessed by users with the 'admin' role
  res.json({ message: "You have access to this admin route" });
});
