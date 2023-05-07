require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
// const resetPasswordRouter = require('./controllers/resetPassword');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const contactsRouter = require('./controllers/contacts');
const { userExtractor } = require('./middleware/auth');
const { MONGO_URI } = require('./config');


(async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//rutas frontend:
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/images', express.static(path.resolve('img')));
app.use('/contacts', express.static(path.resolve('views', 'contacts')));
app.use('/components', express.static(path.resolve('views', 'components')));
// app.use('/resetPassword', express.static(path.resolve('views', 'resetPassword')));
// app.use('/resetPassword/:token', express.static(path.resolve('views', 'resetPassword')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));


// //rutas backend:
app.use('/api/users', usersRouter);
// app.use('/api/resetPassword', resetPasswordRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/contacts',userExtractor , contactsRouter);


app.use(morgan('tiny'));

module.exports = app;
