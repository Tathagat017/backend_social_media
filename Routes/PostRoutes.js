const { PostModel } = require("../Model/PostModel.js");
const express = require("express");
const { Auth } = require("../Middleware/Auth.js");
const postRouter = express.Router();

postRouter.get("/", Auth, async (req, res) => {
  const { device, Device1, Device2, Device3 } = req.query;
  const { authorId, email, password } = req.body;
  try {
    // if (Device) {
    //   const posts = await PostModel.find({
    //     authorId: authorId,
    //     device: device,
    //   });
    //   res.status(200).send(posts);
    // } else {
    //   const posts = await PostModel.find({
    //     authorId: authorId,
    //   });
    //   res.status(200).send(posts);
    // }

    let query_object = { authorId: authorId };
    if ((Device1 !== undefined) & (Device2 !== undefined)) {
      //console.log(Device1, Device2);
      query_object = {
        authorId: authorId,
        device: { $in: [Device1, Device2] },
      };
    } else if (Device1 !== undefined) {
      query_object["device"] = Device1;
    } else if (Device2 !== undefined) {
      query_object["device"] = Device2;
    } else if (device !== undefined) {
      query_object["device"] = device;
    }

    let query_object2_key = Object.keys(query_object);
    console.log(query_object2_key.length);
    if (query_object2_key.length > 1) {
      const posts = await PostModel.find(query_object);
      res.status(200).send(posts);
    } else {
      const posts = await PostModel.find({
        authorId: authorId,
      });
      res.status(200).send(posts);
    }
  } catch (err) {
    res.status(404).send({ error: "error while getting posts " });
  }
});

postRouter.post("/newpost", Auth, async (req, res) => {
  try {
    let post = await new PostModel(req.body);
    post.save();
    res.status(200).send({ message: "New post created successfully" });
  } catch (err) {
    res.status(404).send({ error: "error while creating posts " });
  }
});

postRouter.patch("/update/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findByIdAndUpdate(id, req.body);
    post.save();
    res.status(200).send({ message: "post successfully updated" });
  } catch (err) {
    res.status(404).send({ error: "error while updating posts " });
  }
});

postRouter.delete("/delete/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findByIdAndRemove(id);
    post.save();
    res.status(200).send({ message: "post successfully deleted" });
  } catch (err) {
    res.status(404).send({ error: "error while deleting post" });
  }
});

module.exports = { postRouter };
