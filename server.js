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

app.use("/user/",require("./controler/userController"));
app.use("/blog/",require("./controler/blogController"));


app.listen(8000, () => {
  console.log("Server is running on port 8000");
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

