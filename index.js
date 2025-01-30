// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const fs = require('fs')
const path =require('path');
const { json } = require('body-parser');
const { count } = require('console');


app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold',(req,res)=>{

  const threshold=req.body.threshold;

  if(typeof threshold!=='number'){
    return res.status(400).send({error:"invalid threshold value , value must be a number"})
  }

  const datapath=path.join(__dirname,'data.json');
  fs.readFile(datapath, 'utf8', (err, data) => {
    if(err){
      return res.status(500).send({error: 'error reading student data'})
    }

    const students = JSON.parse(data);

    const filteredStudents =  students.filter(student=>student.total>threshold)
    
    const response={
      count : filteredStudents.length,
      students:filteredStudents.map(student=>({
        name: student.name,
        total:student.total

      }))
    };

    res.send(response)
})
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

