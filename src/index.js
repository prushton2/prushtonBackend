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

// console.log(crypto.createHmac('sha256', "cccccbddgggi").update("5028841").digest("hex"))
// console.log(crypto.createHmac('sha256', "cccccbddggig").update("5028841").digest("hex"))


app.use("/yubikey", yubikeyRoute)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})