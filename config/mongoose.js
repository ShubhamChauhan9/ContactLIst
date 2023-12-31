// require mongoose library
const mongoose = require('mongoose');

// mongoose connected to database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_database');
// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_database');

//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


// connection gives access to the database we earlier connected to the variable db , we acquire the connection
const db = mongoose.connection;

// if error then prints error
db.on('error', console.error.bind(console, 'error Connecting to db'));

// if up and running then prints the msg
db.once('open', function() {
    console.log('successfully Connected to database')
});