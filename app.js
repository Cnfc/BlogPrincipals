var bodyParser = require("body-parser"),
express        = require("express"),
mongoose       = require("mongoose"),
app            = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOGSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "TestBlog",
//   image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
//   body: "Hello its a blog post"
// });
 // 
// RESTFUL ROUTES
app.get("/", function(req, res){
  res.redirect("/blogs");
});
//  INDEX ROUTE
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("ERROR!");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
  // res.render("index");
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
  res.render("new");
});
// CREATE ROUTE
app.post("/blogs", function(req, res){
  //Create blog
  Blog.create(req.body.blog, function(err, newBlog){
    if(err) {
      res.render("new");
    } else {
      // then redirect on the index
      res.redirect("/blogs");
    }
  });
});


// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("SERVER IS RUNNING!");
});







app.listen(3000);
