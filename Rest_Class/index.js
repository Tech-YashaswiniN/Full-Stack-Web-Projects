const express = require("express"); //.1
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const port = 8080;

app.use(methodOverride('_method'));

//To handle the POST request, request sent through the url in the form text to parse this to express understandabel language WRITE BELOW 2 LINES OF CODE.
app.use(express.urlencoded({ extended: true })); //.4
app.use(express.json());

//To set the EJS and Path
app.set("view engine", "ejs"); //.3
app.set("views", path.join(__dirname, "views"));

//To access the CSS and JS file in the public folder.
app.use(express.static(path.join(__dirname, "public")));//.5

// app.get("/", (req, res) => {
//     res.send("Server is working well!")
// })

let posts = [
    {
        id: uuidv4(),
        username: "Yashaswini N",
        content: "Hello world!, I am Yashaswini N pursuing B.E in Channabasaveshwara institute of Texhnology Gubbi affiliated to VTU. I am very much interested in web designing and i feel proud to say i am a Full-Stach Web developer."
    },
    {
        id: uuidv4(),
        username: "HemanthKumar N",
        content: "Hello, I am HemanthKumar I am Pursuing B.E specialization in Computer Science and Engineering but after this engineering i would like to become a IAS officer. Coding is my Passion but IAS is my dream."
    },
    {
        id: uuidv4(),
        username: "Chandhu",
        content: "Hello everyone i am Chandhu and i am a Software developer in Microsoft. Coding is my passion and it is my life."
    }
];
// 1st api to show all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

// 2nd api to render complete new.js, means giving the form to the client from server.
app.get('/posts/new', (req, res) => {
    res.render("new.ejs")
})

//2nd api filling the form taken from the server and sending back to server, when it sent it redirect to "1st api"
app.post('/posts', (req, res) => {
    console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send("Post requesting working")
    res.redirect("/posts");
})

//3rd api
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => p.id === id); // Use strict comparison here
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post })
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    // res.redirect("/posts");
    res.redirect("/posts");
})

//Seting the server to listen .2
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})