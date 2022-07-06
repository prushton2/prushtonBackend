const express            = require("express")
const bodyParser         = require('body-parser');
const cookieParser       = require('cookie-parser');
const cors               = require('cors')
// const crypto = require("crypto");
const port               = 3000

const app = express()

let yubikeyRoute = require("./routes/yubikey/yubikey.js")


app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json());

app.use( cors({
    origin:true,
    credentials: true
}));

app.use("/yubikey", yubikeyRoute)

app.get("/", async(req, res) => {
    res.send("pong")
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})