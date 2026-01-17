import express from "express"; 
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.get("/post", (req, res)=>{
    res.render("post.ejs");
});

app.post("/submit", (req, res) => {
    const time = new Date();
    console.log(time);
    console.log(title);
    console.log(text);
    res.render("index.ejs", {time: time, image: image_upload, title: title, text: text});
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});