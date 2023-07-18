import express from "express"; // new JS if you do not keep mjs so it will not work bcs it is ES6.
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 20);

const app = express(); // it is an handle => app
app.use(express.json());

app.get("/", (req, res) => {
  //   console.log("🚀 ~ file: server.mjs:7 ~ app.get ~ req:", req);
  res.send({ message: "Hello World! by Anus Khalil" });
});

let myItems = [
  {
    id: nanoid(),
    name: "Anus",
    cnic: 123456,
    aboutMe: "AI Chatbot Enthusiast",
  },
];

app.get("/myItems", (req, res) => {
  //   const name = req.params.myName;
  //   console.log("🚀 ~ file: server.mjs:13 ~ app.get ~ name:", name);
  res.send({
    message: `All myItems`,
    data: myItems,
  });
});

app.get("/myItem/:id", (req, res) => {
  console.log(typeof req.params.id);

  if (isNaN(req.params.id)) {
    res.status(403).send("Invalid id Using");
  }

  let isFound = false;

  for (i = 0; i < myItems.length; i++) {
    if (myItems[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "myItem not Found here",
    });
  } else {
    res.send({
      message: "myItem found with id: " + myItems[isFound].id,
      data: myItems[isFound],
    });
  }
});

app.post("/myItem", (req, res) => {
  if (!req.body.name || !req.body.cnic || !req.body.aboutMe) {
    res.status(403);
    res.send(`required parameter missing. example JSON request body:{

            name: "Anus",
            cnic: 123456,
            aboutMe: "AI Chatbot Enthusist",

        }`);
  }

  myItems.push({
    id: nanoid(),
    name: req.body.name,
    cnic: req.body.cnic,
    aboutMe: req.body.aboutMe,
  });

  res.status(201);
  res.send({
    message: +"Created Item Here",
  });
});

app.put("/myItem/:id", (req, res) => {
  if (!req.body.name && !req.body.cnic && !req.body.aboutMe) {
    res.status(403);
    res.send(`required parameter missing. atleast one parameter is required: name, cnic or aboutMe to complete update example JSON request body:
        {
    
            name: "Anus",
            cnic: 123456,
            aboutMe: "AI Chatbot Enthusist",
    
        }`);
  }

  let isFound = false;

  for (i = 0; i < myItems.length; i++) {
    if (myItems[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "myItem not Found here",
    });
  } else {

    if(req.body.name) myItems[isFound].name = req.body.name;
    if(req.body.cnic) myItems[isFound].cnic = req.body.cnic;
    if(req.body.aboutMe) myItems[isFound].aboutMe = req.body.aboutMe;

    res.send({
      message: "myItem is updated with id: " + myItems[isFound].id,
      data: myItems[isFound],
    });
  }
});

app.delete("/myItem/:id", (req, res) => {

    let isFound = false;

    for (i = 0; i < myItems.length; i++) {
      if (myItems[i].id === req.params.id) {
        isFound = i;
        break;
      }
    }
  
    if (isFound === false) {
      res.status(404);
      res.send({
        message: "myItem not Found here",
      });
    } else {
        myItems.splice(isFound, 1)
        
      res.send({
        message: "myItem is deleted" 
      });
    }
  });





const port = process.env.PORT || 3000; //Development mein 3000 available hota hein => Environment var ka number
app.listen(port, () => {
  // Port => In and out way
  console.log(`Example app listening on port ${port}`);
});
