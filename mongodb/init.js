const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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


let allchats = [

    {
        from: "Neha",
        to: "Priya",
        message: "Please send me your maths notes",
        created_at: new Date(), //UTC 
    },

    {
        from: "Kavitha",
        to: "shivu",
        message: "We should purchase comics tomorrow",
        created_at: new Date(), //UTC 
    },

    {
        from: "Rashmi",
        to: "Yashaswini N",
        message: "You are a talented student i have ever seen",
        created_at: new Date(), //UTC 
    },

    {

        from: "ganesh",
        to: "pallavi",
        message: "we should meet today evening",
        created_at: new Date(), //UTC 
    },

    {
        from: "kevin",
        to: "linda",
        message: "we should talk to your parents",
        created_at: new Date(), //UTC 
    },

    {
        from: "gowri",
        to: "param",
        message: "can you bring me some sweets while comeing back",
        created_at: new Date(), //UTC 
    }
]

Chat.insertMany(allchats);



// let chat1 = new Chat({
//     from: "Neha",
//     to: "Priya",
//     message: "Please send me your maths notes",
//     created_at: new Date(), //UTC
// })

// chat1.save().then((res) => {
//     console.log(res);
// })
//     .catch((err) => {
//         console.log(err)
//     })
