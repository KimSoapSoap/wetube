import express from "express";

const PORT = 4000;
const app = express();

const handleHome = (req, res) => {
  return res.send("<h1>welcome to my homepage !</h1>");
};
app.get("/", handleHome);

const handleAbout = (req, res) => {
  return res.send("<h1>my top secret hobby coding room</h1>");
};
app.get("/about", handleAbout);

const handleContact = (req, res) => {
  return res.send("<h2>https://nomadcoders.co/</h2>");
};
app.get("/contact", handleContact);
const handleLogin = (req, res) => {
  return res.sendFile(__dirname + "/test.html");
};
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port ${PORT}`);
app.listen(PORT, handleListening);
