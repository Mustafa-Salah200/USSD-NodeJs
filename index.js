const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9000;

app.listen(port, () => {
  console.log(`USSD API listening at => http://localhost:${port}`);
});

app.post("/ussd", (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  if (text == "") {
      // This is the first request. Note how we start the response with CON
      response = `CON What would you like to check
      Enter Your Name`
      console.log(text);
    } else if (text === "") {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number`;
        console.log(text);
  } else if (text === "1") {
    // Business logic for first level response
    response = `CON Choose account information you want to view
        1. Account number`;
  } 
  else if (text === "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your phone number is ${phoneNumber}`;
  } else if (text === "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  } else if (text === "mustafa") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "Mustafa";
    // This is a terminal request. Note how we start the response with END
    response = `Your Name is ${accountNumber}`;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});
