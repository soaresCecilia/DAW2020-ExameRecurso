var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/teams');

//Base de Dados
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/PEI2020', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});
//--------
var app = express();


/*
Na parte da API, acrescenta um middleware que verifica se os pedidos chegam com um token válido. 
A única exceção é o pedido do token, referido em cima, que não precisa de estar protegido por 
motivos óbvios.
*/

//verificação do token que vem da queryString
//autorização global para qualquer pedido
app.use(function(req, res, next){
  var myToken = req.query.token || req.body.token
  if(myToken){
    jwt.verify(myToken, 'DAW-PRI-2020-recurso', function(e, payload){
      //token errado
      if(e)
        res.status(401).json({error: e})
      else{
        next();
      }
    });
  }
  else 
    res.status(401).json({error: "Token inexistente!"});
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
