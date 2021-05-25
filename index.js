const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/Reviews", (req, res) => {
  const ReviewsList = readJSONFile();       //Lista din reviews.json
  let newReview = {                         //Un nou ob cu datele din front end
      id:uuid.v4.apply(),
      name: req.body.name,
      comentariu: req.body.comentariu
  }

  ReviewsList.push(newReview);
  writeJSONFile(ReviewsList);
  res.status(200).send(newReview);      //Status ok
});

// Read One
app.get("/Reviews/:id", (req, res) => {
  const ReviewsList = readJSONFile();
  let id = req.params.id;           //Iau id-ul pe care il caut
  let checkIfReviewExists = false;
  ReviewsList.forEach(Review => {
      if(Review.id === id) {
          checkIfReviewExists = true;
          res.status(200).send(Review);
      }
  })

  if(checkIfReviewExists === false) {
      res.status(404).send("Review not found!");
  }

});

// Read All
app.get("/Reviews", (req, res) => {
  const ReviewsList = readJSONFile();
  if(ReviewsList != undefined && ReviewsList.length != 0) {
      res.status(200).send(ReviewsList);
  } else {
      res.status(404).send("No reviews found!");
  }

});

// Update
app.put("/Reviews/:id", (req, res) => {
  const ReviewsList = readJSONFile();

  let id = req.params.id;
  let checkIfReviewExists = false;      //flag daca exista review-ul

  for(let i = 0; i < ReviewsList.length; i++) {     //caut review-ul dupa id 
      if(ReviewsList[i].id === id) {                //il actualizez daca l-am gasit
          if(req.body.name) {
            ReviewsList[i].name = req.body.name;
          }

          if(req.body.comentariu) {
            ReviewsList[i].comentariu = req.body.comentariu;
          }

          checkIfReviewExists = true;
          break;                                //gasit si actualizat
      }
  }

  if(checkIfReviewExists === true) {
      writeJSONFile(ReviewsList);           //rescriu review-ul cautat(l-am si gasit)
      res.status(200).send("Review updated!");
  } else {
      res.status(404).send("Review not found!");
  }
  
});

// Delete
app.delete("/Reviews/:id", (req, res) => {
  const ReviewsList = readJSONFile();

  let id = req.params.id;
  let checkIfReviewExists = false;
  for(let i = 0; i < ReviewsList.length; i++) {
      if(ReviewsList[i].id === id) {
          checkIfReviewExists = true;
          ReviewsList.splice(i, 1);     //splic(arg1, arg2) - sterg atatea arg2 incepand cu arg1
          break;
      }
  }

  if(checkIfReviewExists === true) {
      writeJSONFile(ReviewsList);
      res.status(200).send("Review deleted!");
  } else {
      res.status(404).send("Review not found!");
  }
 
});

// Functia de citire din fisierul reviews.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("reviews.json"))["Reviews"];
}

// Functia de scriere in fisierul reviews.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "reviews.json",
    JSON.stringify({ Reviews: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);