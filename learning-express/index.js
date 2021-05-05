const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/api/courses', (req, res) => {
    res.send(['course666', 'course2', 'course3']);
});

app.listen(3000, ()=> console.log('Listening on port 3000..'));
