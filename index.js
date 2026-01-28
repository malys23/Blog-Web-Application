import express from "express"; 
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Container for posts
let posts = [];

//Post constructor
function Post(title, text){
    this.title = title;
    this.text = text;
    this.time = new Date().toLocaleString();
}

//Add post
function addPost(title, text){
    let post = new Post(title, text);
    posts.push(post);
}

//Remove post
function removePost(index){
    posts.splice(index, 1);
}

//Edit post
function editPost(index, title, text){
    posts[index] = new Post(title, text);
}

/**
 * Paths
 */
// Home
app.get("/", (req, res)=>{
    res.render("index.ejs", {posts: posts});
});

//About page
app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

//Post Creation
app.get("/thePost", (req, res)=>{
    res.render("thePost.ejs");
});

//Post Save
app.post("/submit", (req, res) => {
    let title = req.body.title;
    let text = req.body.text;

    addPost(title, text);
    res.redirect("/");
});

//Post View
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postID: index, title: post.title, text: post.text})
});

//Post Edit
app.get("/edit/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("thePost.ejs", {postID: index, title: post.title, text: post.text});
});

//Submit Edit
app.post("/update", (req, res) => {
    let index = req.body.index;
    let title = req.body.title;
    let text = req.body.text;
    editPost(index, title, text);
    res.redirect("/");
});

//Post Delete
app.post("/delete", (req, res) => {
    let index = req.body.postID;
    removePost(index);
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});