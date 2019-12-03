const express = require('express');
const axios = require('axios');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('dist'));

var groupsGenerated = [];
let students = [];
let lastGenerated = new Date();
const links = [process.env.GROUP_1_URL, process.env.GROUP_2_URL, process.env.GROUP_3_URL, process.env.GROUP_4_URL]

function generateGroups(students, random, size) {
if (random) {
    students = shuffle(students);
} else {
    students = students.sort((a, b) => a.skill - b.skill);
}

let groups = [];
for(let i = 0; i < size; i++){
    groups[i]=[];
}

let groupIndex = 0;
let tempStudents = students.slice(0);

while(tempStudents.length > 0) {
    groups[groupIndex].push(tempStudents.shift());
    groupIndex++;
    if(groupIndex >= size){
    groupIndex = 0;
    }
}
lastGenerated = new Date();
return groups;

function shuffle(studentsArray){
    //https://stackoverflow.com/a/2450976/4539316 Fisher-Yates shuffle
    var currentIndex = studentsArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = studentsArray[currentIndex];
    studentsArray[currentIndex] = studentsArray[randomIndex];
    studentsArray[randomIndex] = temporaryValue;
    }

    return studentsArray;
}
}

app.post("/admin", (req, res) => {
const { random, size } = req.body;
if (typeof (random) === 'boolean'
    && /^[0-9]+$/.test(size)
    && parseInt(size) > 0) {
    groupsGenerated = generateGroups(students, random, parseInt(size));
    res.status(200).send(groupsGenerated);
} else {
    res.status(422).send('invalid data');
}
});

app.post("/add-student", (req, res) => {
const student = {
    name: req.body.name,
    skill: parseInt(req.body.skill)
};

if (typeof (student.skill) === 'number' &&
    student.skill >= 1 && student.skill <= 12 &&
    typeof (student.name) === 'string' &&
    student.name.length <= 50) {
    students.push(student);
    res.send(req.body);
} else {
    res.status(422).send('invalid data');
}
});

app.post("/delete-students", (req, res) => {
    let count = students.length;
    students = [];
    groupsGenerated = [];
    res.send({ "deleted": count });
});

    
app.get("/students", function (req, res) {
    res.json(students);
});


app.get("/group", function (req, res) {
    res.json({
        groups: groupsGenerated, 
        lastGenerated: lastGenerated, 
        links: links});
})

app.get("/password", function (req, res) {
    res.json({
        password: process.env.ADMIN_PASSWORD, 
        });
})
// app.get("*", function (req, res) {
// res.status(404).send("error: page not found");
// });


module.exports = app;
