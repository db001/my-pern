const express = require('express');
const app = express();
const cors = require('cors');

const home = require('./routes/home');
const auth = require('./routes/auth');

app.use(express.json()); // Req.body
app.use(cors());

app.use("/", home);
app.use("/auth", auth);

app.listen(5000, () => {
    console.log(`Server is starting on port 5000`);
});