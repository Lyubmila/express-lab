const express = require('express') // Loads express

const getData = require('./Controllers/getData') // import the controller function

const getStudentsData = getData() // call getData

// create an instance of express
const app = express()
const PORT = 3000


// create an instance of express
app.set('view engine', 'ejs')
app.set('views', './views')


//home page
app.get('/', function(req,res){
    res.send(`<h1> Main Page </h1>
                <p> This my bio</p>`)    
} )

app.get('/home', (req, res) =>{
    res.render('home',{
        homeTitleLab: 'Home Page',
        homePageHeader:'Welcome to Personal data'} )
})

app.get('/hello', (req, res) =>{
    res.send(`Hello students!!`)
})

app.get('/hello/:name/:lastName', (req,res) =>{
    res.send(`Hello ${req.params.name} ${req.params.lastName}`)
})


app.get('/about', (req, res) =>{
    res.send(`Here is something about us...`)
})

//shows all students
app.get('/students', (req, res) =>{
    res.render('students', {data: getStudentsData, studentsPage:'Welcome to Students Page'})
})

//show info student by id
app.get('/students/:id', (req, res) =>{
    console.log(req.params);

    const result = getStudentsData.filter(item => item.id === Number(req.params.id)) //from array products take id and === with id on the page
    // console.log(result)

    if (result[0] == undefined){
        res.status(404).render('404') //we change status from 200 to 404
       } else {
        res.render('searchStudent', {pageHeader: 'Student Details', data:result[0]})
       }

})

app.get('/teachers', (req, res) =>{
    res.send(`Here is our teaching staff...`)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
