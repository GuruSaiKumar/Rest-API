const Joi= require('joi')  // For input validation
const express = require('express');
const app = express();

app.use(express.json());   // Express by default doesn't 

// courses here Serves similar to a dtabase
var courses=[
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
];


//Home page or root
app.get('/', (req, res) => {
    res.send('Hello world!!');
});


//****************************// GET requests  //****************************//

//get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//get a specific course for a given id
app.get('/api/courses/:id', (req, res) => {
    const course= courses.find(c=>c.id===parseInt(req.params.id)); //parsing to int since it returns a string
    
    //If not found the course 404 error and RETURN IMMEDIATLY
    if(!course) return res.status(404).send('The course with given id does not exits')
    res.send(course);
})

//****************************// POST requests  //****************************//


//Creating a fuction since we need to validate a course many times
function validateCourse(course){
    //Check documentation of Joi for this new syntax
    //schema is just a set of rules
    // a object has to satisfy to be a valid input
    const schema=Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course);
    return result;
}

app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);
    // console.log(result);

    // If the name is invalid 404
    if(result.error){
        //400 status for bad request
        res.status(400).send(result.error.details[0].message);
        return; // We dont want to execute next statements
        //This syntax is same as return res.status(400)....
    }

    const course = {
        id: courses.length + 1, //assignind a new id to next element
        name: req.body.name     //Input is given as a body object
    };
    courses.push(course);
    res.send(course); //Finally we need to send the newly added object
});

//****************************// PUT requests  //****************************//
app.put('/api/courses/:id', (req, res)=>{
    //Look for that id(course)
    const course= courses.find(c=>c.id===parseInt(req.params.id));
    //If not exist , return 404 Resourse not found
    if(!course){
        res.status(404).send(`No course exits with that id ${req.params.id}`);
        return;
    }
    //Validate
    const result= validateCourse(req.body);
    // If invalid , return 400 - Bad requests
    if(result.error){
        //400 status for bad request
        res.status(400).send(result.error.details[0].message);
        return; // We dont want to execute next statements
    }


    //Update the course
    course.name = req.body.name;

    //return the updated course
    res.send(course);

});

//****************************// DELETE requests  //****************************//
app.delete('/api/courses/:id',(req, res)=>{
    //Look for the id (here course)
    const course= courses.find(c=>c.id===parseInt(req.params.id));
    //Not exits then 404
    if(!course) {
        res.status(404).send('Course not found with given id')
        return;
    }
    //If there then delete it.
    const index=courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});




//****************************//PORT //****************************//
// process.env.PORT =8080; 
const port = process.env.PORT || 3000; // While hosting 3000 may not be available
app.listen(port, ()=> console.log(`Listening on port ${port}..`));

//****************************// TESTING ABOVE REQUESTS //****************************//

/*
1. Open post-man
2. skip this point  (Select Request)
3. Pick a tab and select your request option
4. Put the url (Here http://localhost:3000/api/courses)
5. If we have input like in post,put select body-> raw -> JSON format then give the input in { "name": "new course"}
6. You can see the result down status OK

or check-out this vid for some VS code extension
https://www.youtube.com/watch?v=AbCTlemwZ1k


Misc:

while running use
1. npx nodemon <name.js> if  normal nodemon is not working

*/