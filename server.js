import Express from "express";
import fs from "fs";

const app = Express();
const port = 3000;

var users = [];

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        users = JSON.parse(data);
        res.json(users);
      });
});

app.get("/user/:id", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        users = JSON.parse(data);
        res.json(users.find((user) => {
            return req.params.id == user.id;
        }));
      });
});

app.post("/createUser", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {

        users = JSON.parse(data);
        req.body.id = users.length + 1;
        users.push(req.body);
        var jsonData = JSON.stringify(users);
        fs.writeFile("users.json", jsonData, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(200);
    });
});

app.delete("/deleteUser/:id", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        users = JSON.parse(data);
        users.splice(req.params.id);
        var jsonData = JSON.stringify(users);
        fs.writeFile("users.json", jsonData, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(200);
    });
});

app.listen(port, () => console.log('Listening on port: ' + port));