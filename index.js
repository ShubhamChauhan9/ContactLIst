const express = require('express');
const { property } = require('lodash');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');


// from module.exports-->Contact
const Contact = require('./models/contacts');


const app = express();
// set view engine property to ejs of app
app.set('view engine', 'ejs');

// set the views property of app to path using path.join joining root directory to views folder inside root
app.set('views', path.join(__dirname, 'views'));


// middleware to parsing the data from the browser to the server side creating body object in req sent by action
// mw is a function that has access to req the res before it reaches to controller through route or post the controller channel also and it can manipulate data (preprocess)
app.use(express.urlencoded());

// middleware to include static files by targetting the assets folder
app.use(express.static('assets'));

// middleware1
// next argument passes on what changes have done and calles next middleware
// app.use(function(req, res, next) {
//     console.log('middleware1 called');
//     req.myName = "shubham";
//     next();
// });
// middleware2
// app.use(function(req, res, next) {
//     console.log('My name from mw2', req.myName);
//     console.log('middleware2 called');
//     next();
// });

var contactList = []
app.get('/', function(req, res) {
    // console.log(req);
    // console.log(res);
    res.send('<h1>Cool , server is running!</h1>');
});

app.get('/home', async function(req, res) {
    try {
        let b = await Contact.find({}

            // if (err) {
            //     console.log(err);
            //     return;
            // }


        );
        return res.render('home', { title: 'My contacts', Contact: b });

    } catch {
        console.log('error');
    }


});


app.get('/practice', function(req, res) {
    // console.log(req);
    // console.log(res);
    // render the home (ejs file) file using res.render method and returning it from response
    return res.render('practice', { title: "we Played with Ejs at least a minimum!!" });
});

app.post('/create-contact', async function(req, res) {
    // redirect means take me to that route
    // so req here contains the data encoded to string form needs to be parsed also that is sent by the form that takes input as name and phone
    // parser is used to create body object from the req that contains name and value 
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    // commenting this push method to populate db
    try {
        let newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log('*******', newContact);
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
    }
    // return res.redirect('/home');
    // commenting this res.redirect method to populate db
    // return res.redirect('back');
    // res containing data is being redirected to the practice in views
});



// delete a contact
app.get('/delete-contact/', async function(req, res) {
    // console.log(req.query);
    // get the id of contact from query in the ul
    try {
        let id = req.query.id;

        // find the contact in the database using id and delete
        // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
        await Contact.findByIdAndDelete(id);
        return res.redirect('/home');

    } catch {
        console.log('error in deleting object from database');
        return;
    }

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }



});



app.listen(port, function(err) {
    if (err) { console.log('oops error occurred', err) };

    console.log('server is running fine on port :', port);
});