const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    return res.json(data);
  });
});

app.post("/api/notes/", function (req, res) {
  const newNote = req.body;
  fs.readFile(__dirname + "/db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const arr = JSON.parse(data)

    console.log(arr);
    console.log(newNote)
    arr.push(newNote);
    console.log(arr)
    const stringifiedarr = JSON.stringify(arr)
    fs.writeFile("./db/db.json", stringifiedarr, function (err) {
      if (err) {
        return console.log(err);
      }

    });

  })

});

// app.delete("/api/notes/:id", function (req, res) {


//   fs.readFile(__dirname + "/db/db.json", "utf8", function (error, data) {
//     const idOfNoteToBeDeleted = req.params.id;
//     const parsedData = JSON.parse(data);

//     if (error) {
//       return console.log(error);
//     }
//     for (let i = 0; i < parsedData.length; i++) {
//       if (idOfNoteToBeDeleted == parsedData[i].id) {

//         parsedData.splice([i], 1);

//       }
//     }

//   });

//   return res.json(false);
// })
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});






