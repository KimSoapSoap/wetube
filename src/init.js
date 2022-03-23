import "./db";
import Video from "./models/Video";
import User from "./models/User";
import app from "./server";

const PORT = 2080;

const handleListening = () => console.log(`Server listening on port ${PORT}`);
app.listen(PORT, handleListening);
