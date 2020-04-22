const express = require('express');
const server = express();

const methodOverride = require('method-override');

const routes = require("./routes.js");

const nunjucks = require('nunjucks');

server.set("view engine","njk");
server.use(methodOverride('_method'));
server.use(express.static('public'));
server.use(express.urlencoded({extended:true}));
server.use(routes);

nunjucks.configure("src/app/views",{
    express:server,
    autoescape:false,
    noCache:true
});

server.listen(5000,function(){

    console.log('Servidor rodando na porta 5000');
    
});