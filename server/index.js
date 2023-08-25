require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require('./models/Notes');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path')


connectDB();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

//get All notes
app.get("/api/notes", async (req, res)=> {
    try {
        const data = await Notes.find({});

        if(!data) {
            throw new Error('An error occured while getching notes.')
        }
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error: 'An error occured while getching notes.'} ); 
    }
});


//get note by id
app.get("/api/notes/:id", async (req, res)=> {
    try {

        const noteID = req.params.id;
        const data = await Notes.findById(noteID);

        if(!data) {
            throw new Error('An error occured while getching notes.')
        }
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error: 'An error occured while getching notes.'} ); 
    }
});


//Create a note
app.post("/api/notes", async (req, res)=> {
    try {

        const { title, description} = req.body;
        const data = await Notes.create({title, description});

        if(!data) {
            throw new Error('An error occured while creating a note.')
        }
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error: 'An error occured while creating a note.'} ); 
    }
});



//update a note
app.put("/api/notes/:id", async (req, res)=> {
    try {


        const noteId = req.params.id;
        const { title, description} = req.body;
        const data = await Notes.findByIdAndUpdate(noteId, {title, description});

        if(!data) {
            throw new Error('An error occured while updating a note.')
        }
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error: 'An error occured while updateing a note.'} ); 
    }
});


//delete a note by id
app.delete("/api/notes/:id", async (req, res)=> {
    try {


        const noteId = req.params.id;
        const { title, description} = req.body;
        const data = await Notes.findByIdAndDelete(noteId);

        if(!data) {
            throw new Error('An error occured while updating a note.')
        }
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error: 'An error occured while updateing a note.'} ); 
    }
});









app.get("/", (req, res)=> {
    res.json("Hello mate!");
});

app.get("*", (req, res)=> {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});