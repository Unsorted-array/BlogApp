var express = require('express'),
     app = express(),
    methodOverride = require("method-override"),
    bodyParser= require('body-parser'),
    mongoose=require('mongoose');


mongoose.connect("mongodb://localhost/blog_app",{useMongoClient:true});
app.set("view engine","ejs");


// static pages served
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"))

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


// show route

app.get("/blogs/:id",function (req,res) {

    blog.findById(req.params.id,function (err,foundBlog) {
        if(err)
        {
            res.render("new");
        }
        else
        {
            res.render("show",{blog:foundBlog})
        }

    })


})


app.get("/blogs/:id/edit",function (req,res) {

    blog.findById(req.params.id,function (err,foundBlog) {
        if(err)
        {
            res.render("new");
        }
        else
        {
            res.render("edit",{blog:foundBlog})
        }

    })

})


app.put("/blogs/:id",function (req,res) {


    blog.findByIdAndUpdate(req.params.id,req.body.Blog,function (err,updateblog) {

        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs/" +req.params.id);
        }

    });
})


app.delete("/blogs/:id",function (req,res) {


    blog.findByIdAndRemove(req.params.id,function (err) {

        if(err)
        {
            res.send("error");
        }
        else
        {
            res.redirect("/blogs/");
        }

    });
})


app.listen(12000,function () {
    console.log("server is running")
})

