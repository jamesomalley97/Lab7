const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://jamesomalley:Lecanvey1@cluster0-16fgy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

const MovieModel = mongoose.model('movie', movieSchema);

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/whatever', (req, res) => { res.send('Good Bye') })
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send('Hello ' + req.params.name)
})
app.get('/test', (req, res) => {
    //res.send('i will send a file');
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/api/movies', (req, res) => {
   /* const movies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        }
    ];

    */
   /*
    res.status(200).json({
        message: "Everthing is good",
        myMovies: movies
    })

    //res.send('my api')


    
})

*/




console.log("get request");
MovieModel.find((err,data)=> {
    res.json({movies:data});
})

})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/name', (req, res) => {
    console.log('post called');
    console.log(req.body.fname);

    res.send("Hello from post " +
        req.body.fname + ' ' +
        req.body.lname);
})

app.get('/name', (req, res) => {
    console.log('route calling');

    console.log(req.query.lname);

    res.send('Hello ' + req.query.fname + ' ' + req.query.lname);
})

app.post('/api/movies', (req, res) => {
    console.log('post Sucessfull');
    console.log(req.body)
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });

    res.json('data uploaded')
})

/*
app.get('/api/movies/:id',(req,res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})
*/


app.listen(port, () => console.log(`Example app listening on port ${port}!`))