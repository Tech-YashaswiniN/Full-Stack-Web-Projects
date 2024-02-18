const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", (path.join(__dirname, "views")));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ etended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

let posts = [
    {
        id: uuidv4(),
        username: "Yashaswini N",
        content: "I am beautiful"
    },
    {
        id: uuidv4(),
        username: "Hemanth N",
        content: "I am IAS"
    },
]

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
})

app.get('/posts/new', (req, res) => {
    res.render("new.ejs")
})

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts")
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })
})

