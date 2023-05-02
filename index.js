const express = require("express");
const app = express();

const { connection } = require("./db.js");
const { userRouter } = require("./Routes/UserRoutes.js");
const { postRouter } = require("./Routes/PostRoutes.js");

const env = require("env2")("./.env");

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res
      .status(200)
      .send(
        "<h2>Welcome to homepage of backend api </h2><ul><li>POSTS:Api/posts</li> <li>users/registser</li><li>users/login</li></ul>"
      );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.use("/users", userRouter);

app.use("/posts", postRouter);
app.listen(port, "localhost", async () => {
  try {
    console.log("listening on port " + port);
    console.log("connecting to MongoDB Atlas...");
    await connection;
    console.log("connected to MongoDB Atlas...");
  } catch (err) {
    console.log("The error while connecting to MongoDB Atlas", err);
  }
});
