const express = require('express');
const app = express();

app.use(express.json());

var courses=[
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

//all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Handling post requests
app.post('/api/courses', (req, res) => {
    // If the name is invalid
    if(!req.body.name || req.body.name.length<3){
        //40 status for bad request
        res.status(400).send('Name must be atleast 3 characters long');
        return; // We dont want to execute next statements
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); 
});

//get specific course
app.get('/api/courses/:id', (req, res) => {
    const course= courses.find(c=>c.id===parseInt(req.params.id));
    
    //If not found the course 404 erroe
    if(!course) res.status(404).send('The course with given id does not exits')
    res.send(course);
})
//PORT
// process.env.PORT =8080; 
const port = process.env.PORT || 3000; // While hosting 3000 may not be available
app.listen(port, ()=> console.log(`Listening on port ${port}..`));
