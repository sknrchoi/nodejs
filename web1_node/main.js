var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./route/topic');
var authorRouter = require('./route/author');
var indexRouter = require('./route/index');
var authRouter = require('./route/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.use('/topic', topicRouter);
app.use('/author', authorRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);

// Route error event handler
app.use((request, response, next) => {
    throw new Error(request.url + ' Not Found');
});

app.use((error, request, response, next) => {
    console.log(error);
    response.send(error.message);
});

app.listen(3000);