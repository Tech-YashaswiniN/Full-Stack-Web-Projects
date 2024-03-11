const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const app = express();
const port = 8080;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    })

// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
})

// new route
app.get('/chats/new', (req, res) => {
    res.render("new.ejs")
})

// create route
app.post('/chats', (req, res) => {

    let { from, to, msg } = req.body; //name="from", name="to", name="msg" in new.ejs 
    let newChat = new Chat({
        from: from,
        to: to,
        message: msg,
        created_at: new Date(),
    });


    newChat.save()
        .then((res) => {
            console.log("Chat was saved");
        })
        .catch((err) => {
            console.log("err")
        })

    res.redirect('/chats');
})

// edit message
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat })
})

//update route
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let Updatedchat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
    // console.log(newMsg);
    // console.log(Updatedchat)
    res.redirect('/chats');
})

// delete route
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
    console.log(deletedChat)
})

app.get("/", (req, res) => {
    res.send("server is working")
})


app.listen(port, () => {
    console.log(`App is lisenting on port ${port}`);
})

