index.js
npm init
npm install --save express
<!-- server started using const express , port , app then finally app.listen() -->
npm install ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'views'));
<!-- view engine setup successfull -->


home.ejs created


app.get('/home',function()<!-- controller function -->{
    return res.render('home'.{
        <!-- res.locals.title -->
        title:"Contact List",
        contact_list: contactList
    });
});

<!-- then a middleware is set to read the req -->

<!-- from Form , the data in keys values is sent through req.body-->


app.post('/create-contact',function(req,res){

    contactList.push(req.body);
    return res.redirect('/home');
});


<!-- form + post request handled susseccfully -->


<!-- static files of assets are affected using middleware -->
app.use(express.static('assets'));
<!-- static files (css and javascript for routes) are used for styling and features -->




A delete button is added successfully
<!-- using get req method then the contactList object is spliced after finding the phoneIndex -->
app.get('/delete-contact/', function(req, res) {
    // console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
     if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('/home');
});




<!-- now the Model interaction via Controllers to render views is required. -->
