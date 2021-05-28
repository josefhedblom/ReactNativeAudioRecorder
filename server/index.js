const express   = require('express');
const cors      = require('cors');
const app       = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


const PORT = 6000
app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));