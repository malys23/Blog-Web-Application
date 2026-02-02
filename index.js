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
    res.render("thePost.ejs", {posts: posts});
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
    let postIDNew = posts.indexOf(post)+1;
    res.render("view.ejs", {posts: posts, postID: index, postIDNew:postIDNew, title: post.title, time: post.time, text: post.text});
});

//Post Edit
app.get("/edit/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("thePost.ejs", {posts: posts, postID: index, title: post.title, text: post.text});
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
  addPost("The Art of a Decent Adaptation", "I recently rewatched the Hannibal series that was originally released in 2013. I remember watching it as a teen, and even back then I was impressed with the cinematography and general quality considering it was made for NBC. I never read the books at the time so my first introduction to the world of Thomas Harris (author of the original books) was through a completely different lens than his own works. Now, many years later, after my recent rewatch, I delved into reading the original works and was surprised with what I found. Although the core storyline in the show is slightly altered, the number of direct quotes taken from the books was quite surprising. I attempted to keep track of them with little blue tabs in the books and had to go through several packets to cover them all. The show doesn’t “get it right” in the sense of staying exactly true to the plot but transforms it into something slightly new but nonetheless delicious and exciting. ");
  addPost("The Ups and Downs of a Learning Process", "I think one of the aspects I love most about taking on small coding projects like the creation of this blog site is the learning process. This website was a practice in using EJS and creating appropriate paths across the site for the backend portion. It took some time to figure out the correct way to send the required information to where it needs to go. For the frontend, the design at first went awry before I sat down and created a mockup of the desired visuals which helped tremendously. There were many moments of being stumped which were discouraging but moving through them and figuring things out also brought about a feeling of accomplishment. Solving any problem always comes with a lesson (if you do it right) that can help you hone your skills. I think it is very important to learn to enjoy this process as you move through the journey of learning – it will definitely make things a little easier.");
});