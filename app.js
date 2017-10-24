var express = require('express'),
     app = express(),
    bodyParser= require('body-parser'),
    mongoose=require('mongoose');


mongoose.connect("mongodb://localhost/blog_app",{useMongoClient:true});
app.set("view engine","ejs");


// static pages served
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({extended:true }));



// Mongoose model configuration
var blogSchema= new mongoose.Schema({

    title: String,
    image:  String,
    body:String,
    Created: { type : Date , default : Date.now()}


})





// mongo App config
var blog = mongoose.model("blog",blogSchema);



//RestFul routes

app.get("/",function (req,res) {

   res.redirect("/blogs");

})

//index route
app.get("/blogs",function (req,res) {


     blog.find({},function (err,blogs) {
        if(err)
        {
            console.log("error");
        }
        else {
            res.render("index",{ blogs:blogs })
        }

    });
})

// new route


app.get("/blogs/new",function (req,res) {

    res.render("new");
})

app.post("/blogs",function (req,res) {
    //create blog
    blog.create(req.body.Blog,function (err,newBlog) {

        if(err)
        {
            res.render("new")
        }
        else {
            res.redirect("/blogs");
        }
    })

    // redirect index

})




app.listen(12000,function () {
    console.log("server is running")
})

