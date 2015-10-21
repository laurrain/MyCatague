//'use strict';
var express = require("express")
var exphbs = require("express-handlebars")

  mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
     //products = require('./routes/products');
  
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

//app.get('/', routes.products);
//app.get('/', function(req, res) {res.render('products')});

app.get('/',function(req,res){

  res.render("blog")
});

app.get('/myStore',function(req,res){

  res.render("myStore")
});

var server = app.listen(3000, function(){
  console.log("server is running on " + server.address().address + ":" +server.address().port)

})
