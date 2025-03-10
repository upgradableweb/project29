
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const app = express()
require("dotenv").config();
const Routes = require("./routes/route.js")
const path = require('path')
const v2Router = require("./v2")
const middleware = require("./middleware.js")
const cookieParser = require("cookie-parser");
const userAgent = require("express-useragent");
const PORT = process.env.PORT || 5000

// cookies 
app.use(cookieParser());

// Static html,css,js files
const staticPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(staticPath));
app.use(express.json({ limit: '10mb' }))

// Cross origin resource sharing
app.use(cors())

// user agents
app.use(userAgent.express())


// Authorization for apis
app.use(middleware);

mongoose
.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/v2', v2Router);
app.use(Routes);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`URL : http://localhost:${PORT}`)
})


