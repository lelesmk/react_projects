/* Script reads mock data and writes to mock db.json
   The mockDB.json will be read and manipulated by 
   the mock apiServer.js
*/

/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { courses, authors } = mockData;
const data = JSON.stringify({ courses, authors });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
