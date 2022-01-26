//Express 
const express = require('express');
const app = express();
const PORT = 3000;

//Handlebars
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') 

//Import our database and model
const {sequelize} = require('./db');
const {Sauce} = require('./models/index');

const seed = require('./seed');

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
seed();

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
    res.send(updatedSauce ? 'Updated' : 'Update Failed')
})

//render new-sauce form
app.get('/new-sauce', async (req, res) => {
    res.render('newSauceForm')
})

//render edit-sauce form
app.get('/edit-sauce/:id', async (req, res) => {
    const sauce = await Sauce.findByPk(req.params.id)
    res.render('editSauceForm', {sauce})
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

//serving is now listening to PORT
app.listen(PORT, () => {
    console.log(`Your server is now listening to port ${PORT}`)
})