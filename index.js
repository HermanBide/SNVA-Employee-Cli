

const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

class Person {
  constructor(name, age, email, contact) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.contact = contact;
  }
}

const users = [
  new Person("John", 25, "John@example.com", "9252344534"),
  new Person("Alice", 30, "Alice@example.com"),
  new Person("Bob", 35, "Bob@example.com"),
];

const server = http.createServer((req, res) => {
  if (req.url === "/employee" && req.method == "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      console.log("Chunks Ended");
      // Global Object that is avaliable to all
      // it does a binary kind of operation
      const data = Buffer.concat(chunks);
      const newEmployee = JSON.parse(data.toString());
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
    //   res.end(data);
      res.end(JSON.stringify(newEmployee.toString()));
      console.log("Data received " + data + typeof data);
    });
  }else if (req.url === "/employee" && req.method == "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ Test: "Data" }));
  }
  //EMPLOYEES BY ID
  //EMPLOYEES BY NAME

  //EMPLOYEES return NAME by EMAIL

  //EMPLOYEES BY DELETE EMPLOYEE

  if (req.url === "/image" && req.method == "POST") {
    let contentLength = req.headers["content-length"];

    console.log(JSON.stringify(req.headers));
    console.log(contentLength);
    if (isNaN(contentLength) || contentLength <= 0) {
      res.statusCode = 401;
      res.end(
        JSON.stringify({ status: "Error", desc: "The File Was not there !" })
      );
      return;
    }
    let fileName = req.headers["filename"];
    if (fileName == null) {
      fileName = "File." + req.headers["content-type"].split("/")[1];
    }
    const fileStream = fs.createWriteStream(`${__dirname}/${fileName}`);

    fileStream.on("error", (error) => {
      console.log("Error File " + error);
      res.statusCode = 400;
      res.write(JSON.stringify({ status: "Error", desc: error }));
      req.end();
    });

    req.pipe(fileStream);

    req.on("end", () => {
      fileStream.close(() => {
        res.end(JSON.stringify({ status: "Upload Successfull" }));
      });
    });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
