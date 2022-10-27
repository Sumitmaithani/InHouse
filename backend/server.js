require("dotenv").config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));
app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({limit: '8mb'}));
app.use(router);

app.get('/', (req,res)=>{
     res.send("Hello cowboy");
});

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...`));