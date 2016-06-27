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
      database: 'nelisa_spaza_shop'
};


app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

app.use("/static", express.static("views"));
app.use(express.static("public"));
app.use("/static", express.static("."))
//app.use("/static", express.static("routes"))

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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

app.post("/login", product.authUser);

app.get("/logout", function(req, res){

  res.render("register", {layout : false});
})



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

app.get('/services',function(req,res){

  res.render("services")
});

app.get('/cellAccessories',function(req,res){

  res.render("cellAccessories")
});

app.get('/cellphones',function(req,res){

  res.render("cellphones")
});

app.get('/acerLaptop',function(req,res){

  res.render("acerLaptop")
});

app.get('/allBrandLaptop',function(req,res){

  res.render("allBrandLaptop")
});

app.get('/gadget',function(req,res){

  res.render("gadget")
});

app.get('/myCatalogue',function(req,res){

  res.render("myCatalogue")
});

app.get('/promotion',function(req,res){

  res.render("promotion")
});

app.get('/allBrandCellphone',function(req,res){

  res.render("allBrandCellphone")
});

app.get('/cellphonesView',function(req,res){

  res.render("cellphonesView")
});

app.get('/laptops',function(req,res){

  res.render("laptops")
});

app.get('/surveillance',function(req,res){

  res.render("surveillance")
});

var server = app.listen(3000, function(){
  console.log("server is running on " + server.address().address + ":" +server.address().port)

})
