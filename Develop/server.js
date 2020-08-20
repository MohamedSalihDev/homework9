const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        //console.log(data);
      
        return res.json(data);
      });
  });
  app.post("/api/notes/", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
    let id = newNote.id;
    id = 0;

    id++;
    fs.readFile("/db/db.json", "utf8", function(error, data) {
        
        
        
        if (error) {
          return console.log(error);
        }
        data =[];
        data.push(newNote);
            
          }
        
      
      
        //console.log(data);
      
      );
  
  
    // fs.appendFile("./db/db.json", JSON.stringify(newNote) + "\n", function(err) {
    //     if (err) {
    //       return console.log(err);
    //     }
      
    //     console.log(newNote);
      
    //   });

    
  
    res.json(newNote);
  });

  app.delete("./api/notes/:id", function(req,res){
      
      
      fs.readFile("/db/db.json", "utf8", function(error, data) {
        const idOfNoteToBeDeleted = req.params.id;
        
        
        if (error) {
          return console.log(error);
        }
        for (let i = 0; i < data.length; i++) {
            if (idOfNoteToBeDeleted == data[i].id) {
                data.splice([i],1);
                return res.json(data);
            
          }
        }
      
      
        //console.log(data);
      
      });
  
    return res.json(false);
  })
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

  



