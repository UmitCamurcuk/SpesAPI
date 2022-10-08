require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express();
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(express.urlencoded())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/SpesAPI', 
{ 
    useNewUrlParser : true ,
    useUnifiedTopology : true,
})
.then(() => {
    console.log("MongoDB Connected !")
})

const userRoute = require('./Controllers/UserController');
const itemRoute = require('./Controllers/ItemController');
const attributeRoute = require('./Controllers/AttributeContoller');
const itemTypeRoute = require('./Controllers/ItemTypeController');
const itemValueRoute = require('./Controllers/ItemValuesController');
const AuthRoute = require('./Auth/Auth');
app.use('/user',userRoute);
app.use('/item',itemRoute);
app.use('/attribute',attributeRoute);
app.use('/itemtype',itemTypeRoute);
app.use('/itemvalue',itemValueRoute);
app.use('/auth',AuthRoute);

app.listen(5000, () => {
    console.log("Server is running on 5000 port !");
})

