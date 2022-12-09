require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

const { sessionName, sessionKeys } = require('./config/config');


// Connect to MongoDB
connectDB();


// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));




// built-in middleware to handle urlencoded form data
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/forgot-password', require('./routes/forgotpassword'));
app.use('/reset-password',require('./routes/resetpasswordget'));
app.use('/reset-password',require('./routes/resetpasswordpost'));



app.use(verifyJWT);
app.use(cookieSession({
    name: sessionName,
    keys: sessionKeys
}));
app.use('/linkedin',require('./routes/api/linkedin'));



//app.use('/parcels',require('./routes/api/parcel'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);
mongoose.set('strictQuery', false);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});