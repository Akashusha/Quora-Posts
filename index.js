const { v4: uuidv4 } = require("uuid");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuidv4(),
    username: "Akash",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "Yogesh",
    content: "i love Dancing",
  },
  {
    id: uuidv4(),
    username: "Rohith",
    content: "i love cooking",
  },
];

const port = 8080;
app.listen(port, () => {
  console.log("listening to port");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;

  let post = posts.find((p) => {
    return id === p.id;
  });

  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;

  let post = posts.find((p) => {
    return id === p.id;
  });
  let newcontent = req.body.content;
  post.content = newcontent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => {
    return id === p.id;
  });

  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => {
    return id !== p.id;
  });
  res.redirect("/posts");
});
