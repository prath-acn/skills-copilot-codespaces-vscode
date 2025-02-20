//create web server and listen for requests
//import express module
const express = require('express');
//create express application
const app = express();
//import body-parser module
const bodyParser = require('body-parser');
//import mongoose module
const mongoose = require('mongoose');
//import Comment model
const Comment = require('./models/comment');
//import Post model
const Post = require('./models/post');
//import cors module
const cors = require('cors');
//use cors module
app.use(cors());
//use body-parser module
app.use(bodyParser.json());
//connect to mongodb database
mongoose.connect('mongodb://localhost:27017/comments', {
  useNewUrlParser: true
});