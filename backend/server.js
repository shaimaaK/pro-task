const express = require('express')
const server = express()
const mongoose = require('mongoose')
const users = require('./routes/users.js')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const passport = require('passport');
const cloudinary = require('cloudinary').v2


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = process.env.SECRET;