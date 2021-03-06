require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');
const RecordingRoutes = require('./routes/recordings');
const app       = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

connectDB();

app.use(RecordingRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));