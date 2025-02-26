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
  let user_name;

  if (text === "") {
      // This is the first request. Note how we start the response with CON
      response = `  Enter Your Name`
      user_name = text;
    } else if (text !== "") {
        // Business logic for first level response
        console.log(text);
        response = `Your Name: ${text}\n`;
        response += `1- Account number`;
  } 

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  console.log(text);
  res.send(response);
});
