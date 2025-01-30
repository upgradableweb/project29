const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
const path = require('path')
const v2Router = require("./v2")
const demoRouter = require("./demo/index.js")
const middleware = require("./middleware.js")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 5000
dotenv.config();

app.use(cookieParser());

// Static html,css,js files
const staticPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(staticPath));
app.use(express.json({ limit: '10mb' }))
app.use(cors())

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
app.use('/demo', demoRouter);
app.use(Routes);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})


