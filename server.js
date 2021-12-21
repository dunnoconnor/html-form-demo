//Express 
const express = require('express');
const app = express();
const PORT = 3000;
//import bcrypt after an npm install
const bcrypt = require('bcrypt');
//set number of salt round for bcrypt encryption
const saltRounds = 10;

//Handlebars
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') 

//Import our database and model
const {sequelize} = require('./db');
const {Sauce} = require('./models/sauce');
const {User} = require('./models/user');
const req = require('express/lib/request');

//const seed = require('./seed');

//Set up our templating engine with handlebars
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars'); // To render template files, set the following application setting properties, set in app.js in the default app created by the generator:

//serve static assets from public folder
app.use(express.static('public')) //

//allow express to read json request bodies
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//seed our database
//seed();

//*************** ROUTES ******************//
//index redirects to sauces
app.get('/', (req,res)=>{
    res.redirect('/sauces')
})

//get all sauces
app.get('/sauces', async (req, res) => {
    const sauces = await Sauce.findAll();
    res.render('sauces', {sauces}); //first param points to the sauces view in handlebars, second param is the data from the db
})

//get sauce by id
app.get('/sauces/:id', async (req, res) => {
    const sauce = await Sauce.findByPk(req.params.id);
    res.render('sauce', {sauce}); //sauce hb view
})

//update sauce by id
app.put('/sauces/:id', async (req,res) => {
    let updatedSauce = await Sauce.update(req.body, {
        where: {id: req.params.id}
    })
    const sauce = await Sauce.findByPk(req.params.id)
    res.render('sauce', {sauce})
})

//New Routes go here: 
app.get('/new-sauce', async (req, res) => {
    res.render('newSauceForm')
})

//Post Route triggered by form submit action
app.post('/new-sauce', async (req,res) =>{
    //Add sauce to db based on html form data
    const newSauce = await Sauce.create(req.body)
    //Create a sauceAlert to pass to the template
    let sauceAlert = `${newSauce.name} added to your database`
    //Find newSauce in db by id
    const foundSauce = await Sauce.findByPk(newSauce.id)
    if(foundSauce){
        res.render('newSauceForm',{sauceAlert})
    } else {
        sauceAlert = 'Failed to add Sauce'
        res.render('newSauceForm',{sauceAlert})
    }
})

//DELETE method, sauces/:id path => Deletes a sauce from db.sqlite
app.delete('/sauces/:id', async (req,res)=>{
    const deletedSauce = await Sauce.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedSauce ? 'Deleted' : 'Deletion Failed')
})

//GET new user signup form
app.get('/signup', async (req, res) => {
    //render signup form template
    res.render('signup')
})

//Post Route triggered by signup form submit action
app.post('/signup', async (req,res) =>{
    //access the username, password, and confirmPassword from the form
    const username = req.body.username
    const password = req.body.password
    const confirm = req.body.confirm
    //check that the two password entries match
    if(password!==confirm){
        //if not, signup fails
        let userAlert = 'Signup Failed'
        res.render('signup',{userAlert})
    } else {
        bcrypt.hash(password, saltRounds, async function (err,hash){
            //Add user to db based on html form data with hashed password
            const newUser = await User.create({'username':username, 'password':hash})
            //Create a userAlert to pass to the template
            let userAlert = `Welcome, ${newUser.username}!`
            //Find newUser in db by id
            const foundUser = await User.findByPk(newUser.id)
            if(foundUser){
                res.render('signup',{userAlert})
            } else {
                userAlert = 'Signup Failed'
                res.render('signup',{userAlert})
            }
        })
    }
})

//GET Returning User Sign in form
app.get('/signin', async (req, res) => {
    res.render('signin')
})

//Post Route triggered by form submit action
app.post('/signin', async (req,res) =>{
    const thisUser = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if(!thisUser){
        let userAlert = 'Sign-in Failed'
        res.render('signin',{userAlert})
    } else {
        bcrypt.compare(req.body.password, thisUser.password, async function (err,result){
            if (result){
                let userAlert = `Welcome back, ${thisUser.username}`
                res.render('signin',{userAlert})
            } else {
                let userAlert = 'Sign-in Failed'
                res.render('signin',{userAlert})
            }
        })
    }
})

//serving is now listening to PORT
app.listen(PORT, () => {
    console.log(`Your server is now listening to port ${PORT}`)
})