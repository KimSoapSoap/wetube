import express from "express";

const PORT = 2080;
const app = express();

const urlLogger = (req, res, next) => {
  // console.log(`Path: ${req.method} ${req.url}`);
  console.log(`Path: ${req.url}`);
  next();
};
const timeLogger = (req, res, next) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const hours = String(time.getHours()).padStart(2, "0");
  const mins = String(time.getMinutes()).padStart(2, "0");
  const sec = String(time.getSeconds()).padStart(2, "0");
  console.log(`${year}-${month}-${day} ${hours}:${mins}:${sec}`);

  next();
};
const securityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log(`secure`);
  } else {
    console.log("insecure");
  }
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("have a good time");
  next();
};

const handleProtected = (req, res) => {
  return res.send("<h1>Welcome to the private lounge !</h1>");
};
const handleHome = (req, res) => {
  return res.send("<h1>welcome to my homepage !</h1>");
};
const handleAbout = (req, res) => {
  return res.send("<h1>my top secret hobby coding room</h1>");
};
const handleContact = (req, res) => {
  return res.send("<h2>hi</h2>");
};
const handleLogin = (req, res) => {
  return res.sendFile(__dirname + "/test.html");
};
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/about", handleAbout);
app.get("/contact", handleContact);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port ${PORT}`);
app.listen(PORT, handleListening);
