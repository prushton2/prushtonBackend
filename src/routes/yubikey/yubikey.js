const express = require("express")
const yubikeyConfig = require("./yubikeyConfig.json")
const axios = require("axios")
const crypto = require("crypto")


const client_id = "75687"
const nonce = "askjdnkajsndjkasndkjsnad"

let yubikeyRouter = express.Router();

module.exports = yubikeyRouter;


yubikeyRouter.get("/verify/*", async(req, res) => {
    let url = req.url.split("/")

    let response = await axios
        .get(`https://api.yubico.com/wsapi/2.0/verify?id=${client_id}&otp=${url[2]}&nonce=${nonce}`)
        .then(async(response) => {
  
    response = response.data
    response = response.split("\n")

    if(response[4].startsWith("status=REPLAYED_REQUEST")) {
      res.status(400)
      res.send({
        "keyStatus": "reused",
        "user": null
    })
      return
    }
    
    try {
        if( !response[5].startsWith("status=OK") ) {
          res.status(400)
          res.send({
            "keyStatus": "invalid",
            "user": null
          })
          return
        }
    } catch {
        res.status(400)
        res.send({
            "keyStatus": "invalid",
            "user": null
        })
        return
    }

    let user = url[2].substring(0, 12)

    user = crypto.createHmac('sha256', user).update("5028841").digest("hex")

    if(yubikeyConfig.registeredUsers[user] == undefined) {
      res.status(400)
      res.send({
        "keyStatus": "valid",
        "user": null
      })
      return
    }
    
    res.status(200)
    res.send({
        "keyStatus": "valid",
        "user": yubikeyConfig.registeredUsers[user]
    })
    
  })
  .catch(error => {
    console.error(error);
  });
})