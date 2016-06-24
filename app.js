//'use strict';
var express = require("express")
var exphbs = require("express-handlebars"),

    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    product = require('./routes/products'),
    session = require('express-session');
  
   app = express();

   dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '42926238',
      port: 3306,
      database: 'mysql'
};



app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use("/static", express.static("views"))
app.use(express.static("public"))
app.use("/static", express.static("."))
//app.use("/static", express.static("routes"))

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'lau lo',
  resave: true,
  saveUninitialized: false,
  cookie : {maxAge : 30*60000}
}))

app.get("/login", function(req, res){

  res.render("login", {layout : false});
})

app.get("/logout", function(req, res){

  res.render("register", {layout : false});
})

app.post("/login", product.authUser)

app.get('/register', function(req, res){
  res.render("register", {layout : false});
})

app.post("/register", product.register)

app.get('/',function(req,res){

  res.render("home")
});

//app.get("/admin_panel", product.checkUser, product.adminPanel)
app.get('/admin_panel',function(req,res){

  res.render("admin_panel")
});
app.post("/admin_panel/:username", product.checkUser, product.promoteUser)

app.get('/myStore',function(req,res){

  res.render("myStore")
});

app.get('/about',function(req,res){

  res.render("about")
});

app.get('/contact',function(req,res){

  res.render("contact")
});

app.get('/subscribe',function(req,res){

  res.render("subscribe")
});

app.get('/womenOutfit',function(req,res){

  res.render("womenOutfit")
});

app.get('/menOutfit',function(req,res){

  res.render("menOutfit")
});

app.get('/sheet',function(req,res){

  res.render("sheet")
});

app.get('/roomDecor',function(req,res){

  res.render("roomDecor")
});

app.get('/collections',function(req,res){

  res.render("collections")
});

app.get('/casual',function(req,res){

  res.render("casual")
});

var server = app.listen(3000, function(){
  console.log("server is running on " + server.address().address + ":" +server.address().port)

})
